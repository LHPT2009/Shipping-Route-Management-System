import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProducerService } from '../kafka/producer.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RoleRepository } from '../role/role.repository';
import { SignupInput } from './dto/signup.input';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS_CODE, STATUS } from '../../../../../common/constants/status';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entity/user.entity';
import { RoleEntity } from '../role/entity/role.entity';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { ResetPasswordInput } from '../auth/dto/reset_password.input';
import { UserUpdateRoleDto } from './dto/user-update-role';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let roleRepository: RoleRepository;
  let jwtService: JwtService;
  let producerService: ProducerService;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret',
          signOptions: {
            expiresIn: '1d',
          },
        }),
      ],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            orWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            decode: jest.fn(),
          },
        },
        {
          provide: ProducerService,
          useValue: {
            produce: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            store: {
              keys: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    roleRepository = module.get<RoleRepository>(RoleRepository);
    jwtService = module.get<JwtService>(JwtService);
    producerService = module.get<ProducerService>(ProducerService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  describe('resetPasswordVerifyEmail', () => {
    it('should throw a validation error for inactive user', async () => {
      const inactiveUser = {
        email: 'inactiveuser@example.com',
        password: 'hashedpassword',
        active: false,
      };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(inactiveUser as any);

      await expect(service.resetPasswordVerifyEmail({ email: inactiveUser.email })).rejects.toThrow(CustomValidationError);
      await expect(service.resetPasswordVerifyEmail({ email: inactiveUser.email })).rejects.toMatchObject({
        message: STATUS.VALIDATION_ERROR,
      });
    });

    it('should generate verify token, save user, and send email', async () => {
      const validUser = {
        email: 'validuser@example.com',
        password: 'hashedpassword',
        active: true,
        verify_token: null,
        verify_token_expires: null,
      };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(validUser as any);
      const saveSpy = jest.spyOn(userRepository, 'save').mockResolvedValueOnce(validUser as any);
      const produceSpy = jest.spyOn(producerService, 'produce').mockResolvedValueOnce();

      const result = await service.resetPasswordVerifyEmail({ email: validUser.email });

      expect(saveSpy).toHaveBeenCalled();
      expect(produceSpy).toHaveBeenCalled();
      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, validUser, []));
    });
  });

  describe('create', () => {
    it('should create a new user and send activation email', async () => {
      const signupInput: SignupInput = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password123!',
        passwordConfirm: 'Password123!',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(service, 'findOneById').mockResolvedValueOnce(null);

      const roleEntity = new RoleEntity('1', 'CUSTOMER');

      const newUser = new UserEntity(
        signupInput.username,
        signupInput.email,
        signupInput.password,
        'verify_token_123',
        new Date(Date.now() + 3600000),
        roleEntity,
      );

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(newUser);

      jest.spyOn(producerService, 'produce').mockResolvedValueOnce();

      const result = await service.create(signupInput);

      expect(result).toBeDefined();
    });
    it('should throw a validation error if username or email already exists', async () => {
      const signupInput: SignupInput = {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'Password123!',
        passwordConfirm: 'Password123!',
      };

      const existingUser = new UserEntity(
        'existinguser',
        'existing@example.com',
        'hashedpassword',
        'verify_token_existing',
        new Date(),
        new RoleEntity('1', 'CUSTOMER')
      );

      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(existingUser),
      };

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(queryBuilder as any),

        await expect(service.create(signupInput)).rejects.toThrow(CustomValidationError);
      await expect(service.create(signupInput)).rejects.toMatchObject({ message: "VALIDATION_ERROR" });

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should reset the password and return success', async () => {
      const resetPasswordInput = {
        verifyToken: 'valid_token',
        newPassword: 'NewPassword123!',
        passwordConfirm: 'NewPassword123!',
      };

      const user = {
        verify_token_expires: new Date(Date.now() + 1000 * 60 * 60),
        verify_token: 'valid_token',
        password: 'old_hashed_password',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user as any);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValueOnce('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('new_hashed_password');
      const saveMock = jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user as any);

      const result = await service.resetPassword(resetPasswordInput);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, user, []));
    });

    it('should throw an error if the new password is too weak', async () => {
      const userDTO: ResetPasswordInput = {
        newPassword: 'NewPassword123!',
        passwordConfirm: 'NewPassword123!',
        verifyToken: 'valid_token',
      };

      userDTO.newPassword = 'weak';
      await expect(service.resetPassword(userDTO)).rejects.toThrow(CustomValidationError);
      await expect(service.resetPassword(userDTO)).rejects.toMatchObject({
        message: "VALIDATION_ERROR"
      });
    });
  });

  describe('updateRoleForUser', () => {
    const id = '1';
    const userUpdateRoleDto: UserUpdateRoleDto = {
      roles: '2',
    };
    const user = new UserEntity('testuser', 'testuser@example.com', 'hashedpassword', 'verify_token_123', new Date(), new RoleEntity('1', 'USER'));
    user.id = id;
    it('should successfully update the user role without caching', async () => {
      const user = new UserEntity(
        'john.doe',
        'john@example.com',
        'hashed_password',
        'some_verify_token',
        new Date(Date.now() + 3600000),
        new RoleEntity('1', "demo")
      );
      user.id = '1';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user as any);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      jest.spyOn(cacheManager.store, 'keys').mockResolvedValue([]);

      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(null);

      const result = await service.updateRoleForUser(user.id, userUpdateRoleDto);

      expect(result).toBeInstanceOf(ResponseDto);
      expect(result.data).toEqual(user);

      expect(cacheManager.set).not.toHaveBeenCalled();
    });

    it('should return an error response when the user is not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await service.updateRoleForUser(id, userUpdateRoleDto);
      expect(result).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
    });

    it('should return an error response if an exception occurs', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockImplementationOnce(() => { throw new Error('Database error'); });

      const result = await service.updateRoleForUser(id, userUpdateRoleDto);
      expect(result).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
    });
  });
});