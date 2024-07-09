import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { last, NotFoundError } from 'rxjs';
import { error } from 'console';
import { LoginInput, SignupInput } from 'src/graphql';
import { GraphQLError } from 'graphql';
import { passwordStrength } from 'check-password-strength'
import nonEmptyString from 'src/utils/exception/validation/non-empty-string';
import validEmail from 'src/utils/exception/validation/valid-email';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 1.
  ) {}

  async create(userDTO: SignupInput): Promise<any> {

    if(nonEmptyString(userDTO.lastName)) {
      throw new GraphQLError('Please provide your lastName',);
    }

    if(nonEmptyString(userDTO.firstName)) {
      throw new GraphQLError('Please provide your firstName');
    }

    if(nonEmptyString(userDTO.email) || !validEmail(userDTO.email)) {
      throw new GraphQLError('Please provide your valid email');
    }

    const userIsExist = await this.userRepository.findOneBy({ email: userDTO.email });

    if(userIsExist) {
      throw new GraphQLError('Email is already in use');
    }

    if(nonEmptyString(userDTO.password)) {
      throw new GraphQLError('Please provide your password');
    }

    if(nonEmptyString(userDTO.passwordConfirm)) {
      throw new GraphQLError('Please provide your confirmPassword');
    }

    if(userDTO.password !== userDTO.passwordConfirm) {
      throw new GraphQLError('Password and password confirm do not match');
    }

    if(passwordStrength(userDTO.password).value === 'Too weak') {
      throw new GraphQLError('Password is too weak');
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
      message: "User created successfully, please check your email to verify your account",
    };

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
