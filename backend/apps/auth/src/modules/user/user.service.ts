import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { passwordStrength } from 'check-password-strength';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from '../auth/dto/login.input';
import { EmailService } from '../email/email.service';
import nonEmptyString from '../../utils/validation/non-empty-string';
import validEmail from '../../utils/validation/valid-email';
import { ResponseDto } from '../../common/dto/responseDto';
import { ResponseUnion } from '../../common/dto/responseUnion';
import { ResponseErrorDto } from '../../common/dto/responseError.dto';
import { UserRepository } from './user.repository';
import { SignupResponse } from '../auth/types/signup.types';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService, // 1.
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<UserEntity[]>();
    try {
      const users = await this.userRepository.find();
      response.setStatus(200);
      response.setMessage('Users retrieved successfully');
      response.setData(users);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Users retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    const getUserFromDb = await this.userRepository.findOneBy({ id: id });
    console.log(getUserFromDb);
    return getUserFromDb;
  }

  async create(userDTO: SignupInput): Promise<typeof ResponseUnion> {
    const errorMessage: string[] = await this.validateUser(userDTO);

    if (errorMessage.length > 0) {
      // return {
      //   success: false,
      //   message: errorMessage,
      // };
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('User retrieved Error');
      response.setError('asdas');
      return response;
    }

    const user = new UserEntity();
    user.first_name = userDTO.first_name;
    user.last_name = userDTO.last_name;
    user.email = userDTO.email;

    user.address = '';
    user.phone_number = '';
    user.active = false;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);

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
      `Please click below to confirm your email. \n${url}\nIf you did not request this email you can safely ignore it.`,
    );

    // return {
    //   success: true,
    //   message: [
    //     'User created successfully',
    //     'Please check your email to verify your account',
    //   ],
    // };
    const response = new ResponseDto();
    response.setStatus(200);
    response.setMessage('User Successfully');
    response.setData(user);
    return response;
  }

  async confirmEmail(token: string): Promise<any> {
    const { email } = this.jwtService.verify(token);

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return {
        success: false,
        message: ['User not found'],
      };
    } else {
      user.active = true;
      await this.userRepository.save(user);

      return {
        success: true,
        message: ['Account has been verified'],
      };
    }
  }

  async validateUser(userDTO: SignupInput) {
    const errorMessage: string[] = [];

    if (nonEmptyString(userDTO.last_name)) {
      errorMessage.push('Last name is required');
    }

    if (nonEmptyString(userDTO.first_name)) {
      errorMessage.push('First name is required');
      // return 'Please provide your first_name';
    }

    if (nonEmptyString(userDTO.email) || !validEmail(userDTO.email)) {
      errorMessage.push('Email is invalid');
      // return 'Please provide your valid email';
    }

    const userIsExist = await this.userRepository.findOneBy({
      email: userDTO.email,
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

  async findOne(data: LoginInput): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: id });
  }
}
