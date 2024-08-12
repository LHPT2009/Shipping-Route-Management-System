import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from '../auth/dto/login.input';
// import { EmailService } from '../email/email.service';
import { ResponseDto } from 'common/response/responseDto';
import { UserRepository } from './user.repository';
import { RoleEntity } from '../role/entity/role.entity';
import { STATUS, STATUS_CODE } from 'common/constants/status';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    // private emailService: EmailService,
    private jwtService: JwtService,
  ) { }

  async findAll(): Promise<ResponseDto<UserEntity[]>> {
    try {
      const users = await this.userRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, users, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    const getUserFromDb = await this.userRepository.findOneBy({ id: id });
    return getUserFromDb;
  }

  async create(userDTO: SignupInput): Promise<ResponseDto<UserEntity>> {
    const role = new RoleEntity("1", "user")
    const user = new UserEntity(userDTO.first_name, userDTO.last_name, userDTO.email, "", "", userDTO.password, false, role);
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
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);

  }

  async confirmEmail(token: string): Promise<ResponseDto<any>> {
    const { email } = this.jwtService.verify(token);

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return new ResponseDto(STATUS_CODE.NOT_FOUND, STATUS.NOT_FOUND, null, null);
    } else {
      user.active = true;
      await this.userRepository.save(user);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
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

  async findInfoByID(id: string): Promise<ResponseDto<UserEntity>> {
    try {
      const item = await this.userRepository.findOne({
        where: { id },
        relations: ['roles'],
      });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, item, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);
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
