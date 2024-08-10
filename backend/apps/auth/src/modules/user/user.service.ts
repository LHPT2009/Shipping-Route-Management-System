import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from '../auth/dto/login.input';
import { EmailService } from '../email/email.service';
import { ResponseDto } from 'common/response/responseDto';
import { ResponseUnion } from 'common/response/responseUnion';
import { ResponseErrorDto } from 'common/response/responseError.dto';
import { UserRepository } from './user.repository';
import { RoleEntity } from '../role/entity/role.entity';
import { STATUS, STATUS_CODE } from 'common/constants/status';
import { classToPlain, instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<UserEntity[]>();
    try {
      const users = await this.userRepository.find();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(users);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage('');
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    const getUserFromDb = await this.userRepository.findOneBy({ id: id });
    return getUserFromDb;
  }

  async create(userDTO: SignupInput): Promise<typeof ResponseUnion> {
    const user = new UserEntity();
    user.first_name = userDTO.first_name;
    user.last_name = userDTO.last_name;
    user.email = userDTO.email;

    user.address = '';
    user.phone_number = '';
    user.active = false;

    const chooseRole = new RoleEntity();
    chooseRole.id = '1';
    chooseRole.name = 'user';
    user.roles = chooseRole;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);

    await this.userRepository.save(user);

    // const token = this.jwtService.sign({
    //   email: userDTO.email,
    // });

    // const url = `${process.env.AUTH_URL}/auth/confirm/${token}`;

    // await this.emailService.sendEmail(
    //   userDTO.email,
    //   'Verify a new account',
    //   `Please click below to confirm your email. \n${url}\nIf you did not request this email you can safely ignore it.`,
    // );

    const response = new ResponseDto();
    response.setStatus(STATUS_CODE.CREATE);
    response.setMessage(STATUS.CREATE);
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

  async findInfoByID(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<UserEntity>();
    try {
      const permission = await this.userRepository.findOne({
        where: { id },
        relations: ['roles'],
      });
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage('');
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async findInfoByIDtest(id: string): Promise<any> {
    const permission = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    return instanceToPlain(permission);
  }
}
