import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenService } from './refreshtoken.service';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { JwtService } from '@nestjs/jwt';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { STATUS } from '../../../../../common/constants/status';
import { PayloadType } from '../auth/types';

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;
  let refreshTokenRepository: RefreshTokenRepository;
  let jwtService: JwtService;

  const mockRefreshTokenRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
    decode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        { provide: RefreshTokenRepository, useValue: mockRefreshTokenRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
    refreshTokenRepository = module.get<RefreshTokenRepository>(RefreshTokenRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createRefreshToken', () => {
    it('should create a new refresh token if it does not exist', async () => {
      const payload: PayloadType = { userId: String(1), email: 'test@example.com' };
      const newToken = 'new_refresh_token';
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);
      mockJwtService.sign.mockReturnValue(newToken);
      mockRefreshTokenRepository.create.mockReturnValue({ token: newToken });
      mockRefreshTokenRepository.save.mockResolvedValue({});

      await service.createRefreshToken(payload);

      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledWith({ user: { id: payload.userId } });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { userId: payload.userId, email: payload.email },
        { expiresIn: '7d', secret: process.env.JWT_SECRET || 'secret' }
      );
      expect(mockRefreshTokenRepository.create).toHaveBeenCalledWith({ user: { id: payload.userId }, token: newToken });
      expect(mockRefreshTokenRepository.save).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should update the existing refresh token if it exists', async () => {
      const payload: PayloadType = { userId: String(1), email: 'test@example.com' };
      const existingToken = 'existing_refresh_token';
      const newToken = 'new_refresh_token';
      mockRefreshTokenRepository.findOneBy.mockResolvedValue({ token: existingToken });
      mockJwtService.sign.mockReturnValue(newToken);
      mockRefreshTokenRepository.save.mockResolvedValue({});

      await service.createRefreshToken(payload);

      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledWith({ user: { id: payload.userId } });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { userId: payload.userId, email: payload.email },
        { expiresIn: '7d', secret: process.env.JWT_SECRET || 'secret' }
      );
      expect(mockRefreshTokenRepository.save).toHaveBeenCalledWith(expect.objectContaining({ token: newToken }));
    });
  });

  describe('refreshAccessToken', () => {
    it('should return a new access token if valid', async () => {
      const context = { req: { headers: { access_token: 'valid_access_token' } } };
      const decodedPayload = { userId: 1, email: 'test@example.com' };
      const checkInfo = { token: 'valid_refresh_token' };
      const newAccessToken = 'new_access_token';

      mockJwtService.decode.mockReturnValue(decodedPayload);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(checkInfo);
      mockJwtService.verify.mockReturnValue(undefined);
      mockJwtService.sign.mockReturnValue(newAccessToken);

      const response = await service.refreshAccessToken(context);

      expect(response).toEqual(expect.objectContaining({
        message: STATUS.SUCCESS
      }));
      expect(mockJwtService.decode).toHaveBeenCalledWith('valid_access_token');
      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledWith({ user: { id: decodedPayload.userId } });
      expect(mockJwtService.verify).toHaveBeenCalledWith('valid_refresh_token', { secret: process.env.JWT_SECRET || 'secret' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: decodedPayload.userId, email: decodedPayload.email }, { expiresIn: '1d', secret: process.env.JWT_SECRET || 'secret' });
    });

    it('should throw an error if access token is missing', async () => {
      const context = { req: { headers: {} } };

      await expect(service.refreshAccessToken(context)).rejects.toThrow(new CustomValidationError('ERR_AUTH_LOGIN', {}));
    });

    it('should throw an error if refresh token is not found', async () => {
      const context = { req: { headers: { access_token: 'valid_access_token' } } };
      const decodedPayload = { userId: 1, email: 'test@example.com' };

      mockJwtService.decode.mockReturnValue(decodedPayload);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);

      await expect(service.refreshAccessToken(context)).rejects.toThrow(new CustomValidationError('ERR_AUTH_LOGIN', {}));
    });

    it('should throw an error if refresh token verification fails', async () => {
      const context = { req: { headers: { access_token: 'valid_access_token' } } };
      const decodedPayload = { userId: 1, email: 'test@example.com' };
      const checkInfo = { token: 'invalid_refresh_token' };

      mockJwtService.decode.mockReturnValue(decodedPayload);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(checkInfo);
      mockJwtService.verify.mockImplementation(() => { throw new Error('Token verification failed'); });

      await expect(service.refreshAccessToken(context)).rejects.toThrow(new CustomValidationError(STATUS.ERR_REFRESH_TOKEN, {}));
    });
  });

  describe('remove', () => {
    it('should remove the refresh token if found', async () => {
      const context = { accessToken: 'valid_access_token' };
      const decodedPayload = { userId: 1 };

      mockJwtService.decode.mockReturnValue(decodedPayload);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue({});

      await service.remove(context);

      expect(mockRefreshTokenRepository.findOneBy).toHaveBeenCalledWith({ user: { id: decodedPayload.userId } });
      expect(mockRefreshTokenRepository.remove).toHaveBeenCalled();
    });

    it('should throw an error if refresh token is not found', async () => {
      const context = { accessToken: 'valid_access_token' };
      const decodedPayload = { userId: 1 };

      mockJwtService.decode.mockReturnValue(decodedPayload);
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(context)).rejects.toThrow(new CustomValidationError(STATUS.ERR_NOT_FOUND, {}));
    });
  });
});