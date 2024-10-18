import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from '../auth.resolver';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';
import { UserEntity } from '../../user/entity/user.entity';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { JwtModule } from '@nestjs/jwt';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;
  let userService: UserService;

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
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            loginWithGoogle: jest.fn(),
            loginAdmin: jest.fn(),
            logout: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            resetPasswordVerifyEmail: jest.fn(),
            resetPassword: jest.fn(),
            confirmEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });

  describe('signup', () => {
    it('should return a created user', async () => {
      const input: SignupInput = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
      };

      const result: ResponseDto<UserEntity> = {
        status: 201,
        message: 'User created successfully',
        data: {
          email: 'test@example.com',
          username: 'testuser',
        } as UserEntity,
        error: null,
      };

      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await authResolver.signup(input)).toEqual(result);
    });
  });

  describe('login', () => {
    it('should return login response', async () => {
      const input: LoginInput = { email: 'test@example.com', password: 'password' };

      const result: ResponseDto<{}> = {
        status: 200,
        message: 'SUCCESS',
        data: {
          accessToken: 'test_token',
          expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        error: null,
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authResolver.login(input)).toEqual(result);
    });
  });

  describe('loginWithGoogle', () => {
    it('should return Google login response', async () => {
      const input = { token: 'google_token' };

      const result: ResponseDto<{}> = {
        status: 200,
        message: 'SUCCESS',
        data: {
          accessToken: 'test_token',
          expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        error: null,
      };

      jest.spyOn(authService, 'loginWithGoogle').mockResolvedValue(result);

      expect(await authResolver.loginWithGoogle(input)).toEqual(result);
    });
  });

  describe('logout', () => {
    it('should return logout response', async () => {
      const context = { req: { user: { id: '1' } } };

      const result: ResponseDto<{}> = {
        status: 200,
        message: 'SUCCESS',
        data: null,
        error: null,
      };

      jest.spyOn(authService, 'logout').mockResolvedValue(result);

      expect(await authResolver.logoutAccount(context)).toEqual(result);
    });
  });
});