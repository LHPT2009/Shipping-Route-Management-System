import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { passwordStrength } from 'check-password-strength'
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { SignupResponse } from './types/signup.types';
import { LoginInput } from '../auth/dto/login.input';
import { EmailService } from '../email/email.service';
import nonEmptyString from '../../utils/validation/non-empty-string';
import validEmail from '../../utils/validation/valid-email';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService, // 1.
    private jwtService: JwtService,
  ) { }

  async create(userDTO: SignupInput): Promise<SignupResponse> {

    const errorMessage: string[] = await this.validateUser(userDTO);

    if (errorMessage.length > 0) {
      return {
        success: false,
        message: errorMessage,
      };
    }

    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.active = false;

    const salt = await bcrypt.genSalt(); // 2.
    user.password = await bcrypt.hash(userDTO.password, salt); // 3.

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;

    const token = this.jwtService.sign({
      email: userDTO.email,
    });

    const url = `${process.env.AUTH_URL}/auth/confirm/${token}`;

    await this.emailService.sendEmail(
      userDTO.email,
      // from: '"Support Team" <support@example.com>', // override default from
      'Verify a new account',
      `Please click below to confirm your email. \n${url}\nIf you did not request this email you can safely ignore it.`
    );

    return {
      success: true,
      message: ["User created successfully", "Please check your email to verify your account"],
    };

  }

  async confirmEmail(token: string): Promise<any> {

    const { email } = this.jwtService.verify(token);

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return {
        success: false,
        message: ["User not found"],
      };
    }
    
    else {
      user.active = true;
      await this.userRepository.save(user);

      return {
        success: true,
        message: ["Account has been verified"],
      };

    }
  }

  async validateUser(userDTO: SignupInput) {

    const errorMessage: string[] = [];

    if (nonEmptyString(userDTO.lastName)) {
      errorMessage.push('Last name is required');
    }

    if (nonEmptyString(userDTO.firstName)) {
      errorMessage.push('First name is required');
      // return 'Please provide your firstName';
    }

    if (nonEmptyString(userDTO.email) || !validEmail(userDTO.email)) {
      errorMessage.push('Email is invalid');
      // return 'Please provide your valid email';
    }

    const userIsExist = await this.userRepository.findOneBy({
      email: userDTO.email
    });

    if (userIsExist) {
      errorMessage.push('Email is already in use');
      // return 'Email is already in use';
    }

    if (nonEmptyString(userDTO.password)) {
      errorMessage.push('Please provide your password');
      // return 'Please provide your password';
    }

    if (nonEmptyString(userDTO.passwordConfirm)) {
      errorMessage.push('Please provide your confirmPassword');
      // return 'Please provide your confirmPassword';
    }

    if (userDTO.password !== userDTO.passwordConfirm) {
      errorMessage.push('Password and password confirm do not match');
      // return 'Password and password confirm do not match';
    }

    if (passwordStrength(userDTO.password).value === 'Too weak') {
      errorMessage.push('Password is too weak');
      // return 'Password is too weak';
    }

    return errorMessage;

  }

  async findOne(data: LoginInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }
}
