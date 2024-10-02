import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { UserRepository } from '../user/user.repository';
import { STATUS_CODE, STATUS } from '../../../../../common/constants/status';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { LoginInput } from './dto/login.input';
import { UserEntity } from '../user/entity/user.entity';
import { LoginGoogleInput } from './dto/login_google.input';
import * as bcrypt from 'bcryptjs';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;
    let refreshTokenService: RefreshTokenService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: { findOne: jest.fn(), createGoogleAccount: jest.fn() },
                },
                {
                    provide: JwtService,
                    useValue: { sign: jest.fn() },
                },
                {
                    provide: RefreshTokenService,
                    useValue: { createRefreshToken: jest.fn(), remove: jest.fn() },
                },
                {
                    provide: UserRepository,
                    useValue: { findOne: jest.fn() },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
        refreshTokenService = module.get<RefreshTokenService>(RefreshTokenService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    describe('login', () => {
        it('should return login response with accessToken when credentials are valid', async () => {
            const loginDTO: LoginInput = { email: 'test@example.com', password: 'password' };
            const user: UserEntity = {
                id: '1',
                email: 'test@example.com',
                password: 'hashedpassword',
                active: true
            } as UserEntity;

            jest.spyOn(userService, 'findOne').mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');
            jest.spyOn(refreshTokenService, 'createRefreshToken').mockResolvedValue(undefined);

            const result = new ResponseDto(
                STATUS_CODE.SUCCESS,
                STATUS.SUCCESS,
                { accessToken: 'accessToken', expiresIn: expect.any(String) },
                []
            );

            expect(await authService.login(loginDTO)).toEqual(result);
        });

        it('should throw validation error if password is incorrect', async () => {
            const loginDTO: LoginInput = { email: 'test@example.com', password: 'wrongpassword' };
            const user: UserEntity = { id: '1', email: 'test@example.com', password: 'hashedpassword', active: true } as UserEntity;

            jest.spyOn(userService, 'findOne').mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

            await expect(authService.login(loginDTO)).rejects.toThrow(CustomValidationError);
        });
    });

    describe('loginWithGoogle', () => {
        it('should return login response with accessToken for existing Google user', async () => {
            const loginGoogleInput: LoginGoogleInput = { token: 'google_token' };
            const tokenInfo = {
                email: 'test@example.com',
                aud: 'test_aud',
                scopes: ['email', 'profile'],
                expiry_date: Date.now() + 3600 * 1000, // 1 hour in the future
            };
            const user: UserEntity = {
                id: '1',
                email: 'test@example.com',
                roles: { id: '1', name: 'Admin' },
            } as UserEntity;

            jest.spyOn(authService.oauthClient, 'getTokenInfo').mockResolvedValue(tokenInfo);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');

            const expectedResponse = new ResponseDto(
                STATUS_CODE.SUCCESS,
                STATUS.SUCCESS,
                { accessToken: 'accessToken', expiresIn: expect.any(String) },
                [],
            );

            const result = await authService.loginWithGoogle(loginGoogleInput);
            expect(result).toEqual(expectedResponse);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { email: tokenInfo.email },
                relations: ['roles'],
            });
            expect(refreshTokenService.createRefreshToken).toHaveBeenCalled();
        });

        it('should create a new user if the Google user does not exist', async () => {
            const loginGoogleInput: LoginGoogleInput = { token: 'google_token' };
            const tokenInfo = {
                email: 'test@example.com',
                aud: 'test_aud',
                scopes: ['email', 'profile'],
                expiry_date: Date.now() + 3600 * 1000,
            };
            const newUser: UserEntity = {
                id: '2',
                email: 'newuser@example.com',
                roles: { id: '1', name: 'Admin' },
            } as UserEntity;

            jest.spyOn(authService.oauthClient, 'getTokenInfo').mockResolvedValue(tokenInfo);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(userService, 'createGoogleAccount').mockResolvedValue(newUser);
            jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');

            const expectedResponse = new ResponseDto(
                STATUS_CODE.SUCCESS,
                STATUS.SUCCESS,
                { accessToken: 'accessToken', expiresIn: expect.any(String) },
                [],
            );

            const result = await authService.loginWithGoogle(loginGoogleInput);
            expect(result).toEqual(expectedResponse);
            expect(userService.createGoogleAccount).toHaveBeenCalledWith(tokenInfo.email);
            expect(refreshTokenService.createRefreshToken).toHaveBeenCalled();
        });

        it('should handle errors when Google login fails', async () => {
            const loginGoogleInput: LoginGoogleInput = { token: 'invalid_token' };

            jest.spyOn(authService.oauthClient, 'getTokenInfo').mockRejectedValue(new Error('Invalid token'));

            await expect(authService.loginWithGoogle(loginGoogleInput)).resolves.toBeUndefined();
            expect(authService.oauthClient.getTokenInfo).toHaveBeenCalledWith(loginGoogleInput.token);
        });
    });

    describe('loginAdmin', () => {
        it('should throw error if the user is not an admin', async () => {
            const loginDTO: LoginInput = { email: 'test@example.com', password: 'password' };
            const user: UserEntity = { id: '1', email: 'test@example.com', roles: { name: 'USER' } } as any;

            jest.spyOn(userService, 'findOne').mockResolvedValue(user);

            await expect(authService.loginAdmin(loginDTO)).rejects.toThrow(CustomValidationError);
        });

        it('should return login response if the user is an admin', async () => {
            const loginDTO: LoginInput = { email: 'admin@example.com', password: 'password' };
            const user: UserEntity = { id: '1', email: 'admin@example.com', roles: { name: 'ADMIN' }, active: true } as any;

            jest.spyOn(userService, 'findOne').mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');

            const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken: 'accessToken', expiresIn: expect.any(String) }, []);

            expect(await authService.loginAdmin(loginDTO)).toEqual(result);
        });
    });

    describe('logout', () => {
        it('should return success response on logout', async () => {
            const context = { req: { user: { id: '1' } } };

            const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
            jest.spyOn(refreshTokenService, 'remove').mockResolvedValue(null);

            expect(await authService.logout(context)).toEqual(result);
        });
    });
});