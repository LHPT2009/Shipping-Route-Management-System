import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from '../auth/dto/login.input';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { UserRepository } from './user.repository';
import { RoleEntity } from '../role/entity/role.entity';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import * as crypto from 'crypto';
import { validEmail } from '../../../../../common/exception/validation/email.validation';
import { validUsername } from '../../../../../common/exception/validation/username.validation';
import { validPassword } from '../../../../../common/exception/validation/password.validation';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { ConfirmEmailInput } from '../auth/dto/confirm_email.input';
import * as bcrypt from 'bcryptjs';
import { ResetPasswordInput } from '../auth/dto/reset_password.input';
import { ResetPasswordVerifyEmailInput } from '../auth/dto/reset_password_verify_email.input';
import { ROLE } from '../../../../../common/constants/role';
import { PayloadType } from '../auth/types';
import { UserUpdateDto } from './dto/user-update.dto';
import { validPhone } from '../../../../../common/exception/validation/phone.validation';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FilterUsersDto } from './dto/user-filter.dto';
import { FilterUsersType } from './types/user-filter.types';
import { UserUpdateRoleDto } from './dto/user-update-role';
import { UpdateStatusUserDto } from './dto/user-update-status';
import { ProducerService } from '../kafka/producer.service';
import { RoleRepository } from '../role/role.repository';
import { instanceToPlain } from 'class-transformer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
    private readonly producerService: ProducerService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) { }
  async findAll(filterUsersDto: FilterUsersDto): Promise<ResponseDto<{
    users: FilterUsersType[];
    total: number;
    page: number;
    limit: number;
  }>> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('roles.permissions', 'permissions');

      if (filterUsersDto.username) {
        queryBuilder.andWhere('LOWER(user.username) LIKE LOWER(:username)', { username: `%${filterUsersDto.username.toLowerCase()}%` });
      }
      if (filterUsersDto.email) {
        queryBuilder.andWhere('LOWER(user.email) LIKE LOWER(:email)', { email: `%${filterUsersDto.email.toLowerCase()}%` });
      }
      if (filterUsersDto.status) {
        if (filterUsersDto.status === 'Active') {
          queryBuilder.andWhere('user.active = :active', { active: true });
        } else {
          queryBuilder.andWhere('user.active = :active', { active: false });
        }
      }
      if (filterUsersDto.sort_field && filterUsersDto.sort_order) {
        queryBuilder.orderBy(`user.${filterUsersDto.sort_field}`, filterUsersDto.sort_order === 'ascend' ? 'ASC' : 'DESC');
      }

      const [users, total] = await queryBuilder
        .andWhere('roles.name != :adminRole', { adminRole: 'ADMIN' })
        .skip((filterUsersDto.page - 1) * filterUsersDto.limit)
        .take(filterUsersDto.limit)
        .getManyAndCount();

      const usersResponse = users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles.name,
          permissions: user.roles.permissions.map(permission => permission.name),
          status: user.active ? "Active" : "Inactive",
        };
      });

      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, {
        total,
        page: filterUsersDto.page,
        limit: filterUsersDto.limit,
        users: usersResponse,
      }, []);

    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { user: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    const getUserFromDb = await this.userRepository.findOneBy({ id: id });
    return getUserFromDb;
  }

  async create(userDTO: SignupInput): Promise<ResponseDto<UserEntity>> {
    const role = new RoleEntity("1", ROLE.CUSTOMER)
    const validationErrors = this.validateUser(userDTO.email, userDTO.password, userDTO.passwordConfirm, userDTO.username);
    if (Object.keys(validationErrors).length !== 0) {
      throw new CustomValidationError('Invalid input', validationErrors);
    }

    else {
      const getUserByEmailOrUsername: UserEntity = await this.userRepository.createQueryBuilder("user")
        .where("user.email = :email", { email: userDTO.email })
        .orWhere("user.username = :username", { username: userDTO.username })
        .getOne();

      if (getUserByEmailOrUsername) {
        throw new CustomValidationError('Validation failed', { email: ['Username or email already exists'] });
      } else {
        const verifyToken = crypto.randomBytes(32).toString('base64url');
        const verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const user = new UserEntity(
          userDTO.username,
          userDTO.email,
          userDTO.password,
          verifyToken,
          verifyTokenExpires,
          role
        );
        await this.userRepository.save(user);

        const url = `${process.env.CUSTOMER_EMAIL_URL}/${verifyToken}?email=${userDTO.email}`;

        const item = {
          title: "Account activation",
          content: "Thanks for registering! Please verify your email by clicking the button below to complete the process.",
          button: "Activate your account",
          verifyToken: verifyToken,
          email: userDTO.email,
          username: userDTO.username,
          url: url,
        };

        const itemString = JSON.stringify(item);

        await this.producerService.produce({
          topic: 'send-mail',
          messages: [
            {
              value: itemString
            }
          ]
        });

        return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
      }
    }
  }

  async createGoogleAccount(email: string): Promise<UserEntity> {
    const role = new RoleEntity("1", ROLE.CUSTOMER)
    const user = new UserEntity(
      email.split('@')[0],
      email,
      "google-account-password",
      null,
      null,
      role
    );
    await this.userRepository.save(user);
    return user;
  }

  async confirmEmail(userDTO: ConfirmEmailInput): Promise<ResponseDto<[]>> {

    const user = await this.userRepository.findOneBy({ verify_token: userDTO.verifyToken });

    if (!user) {
      throw new CustomValidationError('Not found', { user: ['Token is invalid. Please try again with new request.'] });
    } else if (user.verify_token_expires < new Date()) {
      throw new CustomValidationError('Token expired', { user: ['Token expired. Please try again with new request.'] });
    } else {
      user.active = true;
      user.verify_token = null;
      user.verify_token_expires = null;
      await this.userRepository.save(user);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, [], []);
    }
  }

  async resetPasswordVerifyEmail(userDTO: ResetPasswordVerifyEmailInput): Promise<ResponseDto<{}>> {
    if (!validEmail(userDTO.email)) {
      throw new CustomValidationError('Invalid input', { email: ['Email is invalid'] });
    }
    const user = await this.userRepository.findOneBy({ email: userDTO.email });
    if (!user) {
      throw new CustomValidationError('Not found', { email: ['User is not found. Please try again with another email.'] });
    }
    const isGoogleAccount = await bcrypt.compare(
      "google-account-password",
      user.password,
    );
    if (isGoogleAccount) {
      throw new CustomValidationError('Invalid input', { currentPassword: ['Your account must not be changed password.'] });
    }
    if (!user.active) {
      throw new CustomValidationError(STATUS.VALIDATION_ERROR, { email: ['Your account has not been activated.'] });
    }
    const verifyToken = crypto.randomBytes(32).toString('base64url');
    const verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    user.verify_token = verifyToken;
    user.verify_token_expires = verifyTokenExpires;
    await this.userRepository.save(user);

    const url = `${process.env.CUSTOMER_RESET_PASSWORD_URL}/${verifyToken}?email=${userDTO.email}`;

    const item = {
      title: "Reset password",
      content: "Please click the button below to recover your account.",
      button: "Reset your password",
      verifyToken: verifyToken,
      email: user.email,
      username: user.username,
      url: url,
    };

    const itemString = JSON.stringify(item);

    await this.producerService.produce({
      topic: 'send-mail',
      messages: [
        {
          value: itemString
        }
      ]
    });
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
  }

  async resetPassword(userDTO: ResetPasswordInput): Promise<ResponseDto<{}>> {
    if (!validPassword(userDTO.newPassword)) {
      throw new CustomValidationError('Invalid input', { newPassword: ['New password is too weak'] });
    }
    const user = await this.userRepository.findOneBy({ verify_token: userDTO.verifyToken });
    if (!user) {
      throw new CustomValidationError('Not found', { verifyToken: ['Token is invalid. Please try again with new request.'] });
    }
    if (user.verify_token_expires < new Date()) {
      throw new CustomValidationError('Token expired', { user: ['Token expired. Please try again with new request.'] });
    }
    if (userDTO.newPassword !== userDTO.passwordConfirm) {
      throw new CustomValidationError('Invalid input', { passwordConfirm: ['Password confirm is not match'] });
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.newPassword, salt);
    user.verify_token = null;
    user.verify_token_expires = null;
    await this.userRepository.save(user);
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
  }

  async findOne(data: LoginInput): Promise<UserEntity> {
    let user: UserEntity;
    if (validEmail(data.email)) {
      user = await this.userRepository.findOne({
        where: { email: data.email },
        relations: ['roles'],
      });
    } else {
      user = await this.userRepository.findOne({
        where: { username: data.email },
        relations: ['roles'],
      });
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
        relations: ['roles', 'roles.permissions'],
      });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, item, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { email: ['Internal error occurs. Please contact to admin for more help.'] });
    }
  }

  async findInfoByToken(context: any): Promise<ResponseDto<UserEntity>> {
    const decode = this.jwtService.decode(context.accessToken)
    const item = decode as PayloadType;
    const id = item.userId;

    try {
      const item = await this.userRepository.findOne({
        where: { id },
        relations: ['roles', 'roles.permissions'],
      });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, item, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { email: ['Internal error occurs. Please contact to admin for more help.'] });
    }
  }

  async updateUserByToken(context: any, userDTO: UserUpdateDto): Promise<ResponseDto<UserEntity>> {
    const decode = this.jwtService.decode(context.accessToken)
    const item = decode as PayloadType;
    const id = item.userId;

    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new CustomValidationError('Not found', { email: ['User is not found. Please try again with another email.'] });
    } else {
      if (userDTO.username) {
        const usernameIsExist = await this.userRepository.findOneBy({ username: userDTO.username });
        if (usernameIsExist && usernameIsExist.id !== id) {
          throw new CustomValidationError('Validation failed', { username: ['Username already exists'] });
        } else {
          if (!validUsername(userDTO.username)) {
            throw new CustomValidationError('Invalid input', { username: ['Username is invalid'] });
          } else {
            user.username = userDTO.username;
          }
        }
      }
      if (userDTO.fullname) {
        user.fullname = userDTO.fullname;
      }
      if (userDTO.phone_number) {
        if (!validPhone(userDTO.phone_number)) {
          throw new CustomValidationError('Invalid input', { phone_number: ['Phone number is invalid'] });
        } else {
          user.phone_number = userDTO.phone_number;
        }
      }
      if (userDTO.address) {
        user.address = userDTO.address;
      }
      user.img = userDTO.img;
      await this.userRepository.save(user);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
    }
  }

  async changePassword(context: any, userDTO: ChangePasswordDto): Promise<ResponseDto<UserEntity>> {
    const decode = this.jwtService.decode(context.accessToken)
    const item = decode as PayloadType;
    const id = item.userId;

    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new CustomValidationError('Not found', { email: ['User is not found. Please try again with another email.'] });
    } else {
      const isGoogleAccount = await bcrypt.compare(
        "google-account-password",
        user.password,
      );
      if (isGoogleAccount) {
        throw new CustomValidationError('Invalid input', { currentPassword: ['Your account must not be changed password.'] });
      }

      const passwordMatched = await bcrypt.compare(
        userDTO.currentPassword,
        user.password,
      );
      if (!passwordMatched) {
        throw new CustomValidationError('Invalid input', { currentPassword: ['Current password is wrong. Please try again.'] });
      } else {
        if (!validPassword(userDTO.newPassword)) {
          throw new CustomValidationError('Invalid input', { newPassword: ['New password is too weak'] });
        } else {
          const newPasswordExists = await bcrypt.compare(
            userDTO.newPassword,
            user.password,
          );
          if (newPasswordExists) {
            throw new CustomValidationError('Invalid input', { newPassword: ['New password must be different with current password. Please try again.'] });
          } else {
            if (userDTO.newPassword !== userDTO.passwordConfirm) {
              throw new CustomValidationError('Invalid input', { passwordConfirm: ['Password confirm is not match'] });
            } else {
              const salt = await bcrypt.genSalt();
              user.password = await bcrypt.hash(userDTO.newPassword, salt);
              await this.userRepository.save(user);
              return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []);
            }
          }
        }
      }
    }
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

  async updateRoleForUser(id: string, userUpdateRoleDto: UserUpdateRoleDto): Promise<ResponseDto<UserEntity>> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      Object.assign(user, userUpdateRoleDto);
      await this.userRepository.save(user);

      const usersInRedis: string[] | null = await this.cacheManager.store.keys();

      const userInRedisAffected: string | null = usersInRedis.find(
        redisUserId => user.id.toString() === redisUserId
      );

      if (userInRedisAffected) {
        const role: RoleEntity = await this.roleRepository.findOne({
          where: { id: userUpdateRoleDto.roles },
          relations: ['permissions'],
        });

        const roleName = instanceToPlain(role).name;
        const permissionNames = instanceToPlain(role).permissions.map(permission => permission.name);

        const result: {
          id: string;
          role: string;
          permissions: string[];
        } = {
          id: user.id,
          role: roleName,
          permissions: permissionNames,
        };

        await this.cacheManager.set(userInRedisAffected, result);
      }
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, user, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async updateStatusUser(id: string, updateStatusUserDto: UpdateStatusUserDto): Promise<ResponseDto<UserEntity>> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      Object.assign(user, updateStatusUserDto);
      await this.userRepository.save(user);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, user, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async remove(id: string): Promise<ResponseDto<UserEntity>> {
    try {
      await this.userRepository.delete(id);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async userStatistics(): Promise<ResponseDto<number>> {
    try {
      const totalUsers = await this.userRepository.count();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalUsers, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
