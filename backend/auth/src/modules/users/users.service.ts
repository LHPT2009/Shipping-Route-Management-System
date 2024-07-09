import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { last, NotFoundError } from 'rxjs';
import { error } from 'console';
import { LoginInput, SignupInput, SignupResponse } from 'src/graphql';
import { GraphQLError } from 'graphql';
import { passwordStrength } from 'check-password-strength'
import nonEmptyString from 'src/utils/exception/validation/non-empty-string';
import validEmail from 'src/utils/exception/validation/valid-email';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 1.
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

    const salt = await bcrypt.genSalt(); // 2.
    user.password = await bcrypt.hash(userDTO.password, salt); // 3.

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;

    return {
      success: true,
      message: ["User created successfully", "Please check your email to verify your account"],
    };

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

    const userIsExist = await this.userRepository.findOneBy({ email: userDTO.email });

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
