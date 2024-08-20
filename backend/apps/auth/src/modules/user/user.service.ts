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
import * as crypto from 'crypto';
import { graphql, GraphQLError } from 'graphql';
import { validEmail } from 'common/exception/validation/email.validation';
import { validUsername } from 'common/exception/validation/username.validation';
import { validPassword } from 'common/exception/validation/password.validation';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { EmailService } from '../email/email.service';
import { ConfirmEmailInput } from '../auth/dto/confirm_email.input';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
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

    const validationErrors = this.validateUser(userDTO.email, userDTO.password, userDTO.passwordConfirm, userDTO.username);
    if (Object.keys(validationErrors).length !== 0) {
      throw new CustomValidationError('Invalid input', validationErrors);
    }

    else {
      const getUserByEmail: UserEntity = await this.userRepository.findOneBy({ email: userDTO.email });
      if (getUserByEmail) {
        throw new CustomValidationError('Validation failed', { email: ['Email already exists'] });
      }
      else {
        const verifyToken = crypto.randomBytes(32).toString('base64url');
        const verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); //24 hours
        const user = new UserEntity(
          userDTO.username,
          userDTO.email,
          userDTO.password,
          verifyToken,
          verifyTokenExpires,
          role
        );
        await this.userRepository.save(user);
        this.sendMail(verifyToken, userDTO.email, userDTO.username);
        return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
      }
    }
  }

  private email_template(url: string, username: string): string {
    const templatePath = path.resolve(process.cwd(), 'apps/auth/src/modules/email/email_template.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{url}}', url)
      .replace('{{username}}', username)
      .replace('{{contact}}', process.env.CUSTOMER_CONTACT_URL)

    return htmlContent;
  }

  sendMail(verifyToken: string, email: string, username: string) {
    try {
      const url = `${process.env.CUSTOMER_EMAIL_URL}/${verifyToken}?email=${email}`;
      const emailHtml = this.email_template(url, username);

      this.emailService.sendEmail(
        email,
        'Verify a new account',
        emailHtml
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async confirmEmail(userDTO: ConfirmEmailInput): Promise<ResponseDto<[]>> {

    const user = await this.userRepository.findOneBy({ verify_token: userDTO.verifyToken });

    if (!user) {
      throw new CustomValidationError('Not found', { user: ['User not found'] });
    } else if (user.verify_token_expires < new Date()) {
      throw new CustomValidationError('Token expired', { user: ['Token expired'] });
    } else {
      user.active = true;
      // user.verify_token = null;
      // user.verify_token_expires = null;
      await this.userRepository.save(user);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, [], []);
    }
  }

  async findOne(data: LoginInput): Promise<UserEntity> {
    let user: UserEntity;
    if (validEmail(data.email)) {
      user = await this.userRepository.findOneBy({ email: data.email });
    } else{
      user = await this.userRepository.findOneBy({ username: data.email });
    }
    if (!user) {
      throw new CustomValidationError('Not found', { username: ['User is not found'] });
    }
    return user;
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

  validateUser(email: string, password: string, passwordConfirm: string, username: string) {
    const validationErrors: ValidationErrorsInterface = {}
    if (!validEmail(email)) {
      validationErrors[email] = ['Email is invalid']
    }
    if (!validUsername(username)) {
      validationErrors[username] = ['Username is invalid']
    }
    if (!validPassword(password)) {
      validationErrors[password] = ['Password is too weak']
    }
    if (password !== passwordConfirm) {
      validationErrors[password] = ['Password is not match']
    }
    return validationErrors;
  }
}
