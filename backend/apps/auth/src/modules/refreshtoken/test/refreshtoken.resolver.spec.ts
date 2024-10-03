import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenResolver } from '../refreshtoken.resolver';
import { RefreshTokenService } from '../refreshtoken.service';
import { ResponseDto } from '../../../../../../common/response/responseDto';

describe('RefreshTokenResolver', () => {
  let resolver: RefreshTokenResolver;
  let refreshTokenService: RefreshTokenService;

  const mockRefreshTokenService = {
    refreshAccessToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenResolver,
        { provide: RefreshTokenService, useValue: mockRefreshTokenService },
      ],
    }).compile();

    resolver = module.get<RefreshTokenResolver>(RefreshTokenResolver);
    refreshTokenService = module.get<RefreshTokenService>(RefreshTokenService);
  });

  describe('getRefreshAccessToken', () => {
    it('should return a ResponseDto with new access token', async () => {
      const context = {};
      const mockResponse = new ResponseDto(200, 'Success', { accessToken: 'newAccessToken' });

      mockRefreshTokenService.refreshAccessToken.mockResolvedValue(mockResponse);

      const result = await resolver.getRefreshAccessToken(context);

      expect(result).toEqual(mockResponse);
      expect(refreshTokenService.refreshAccessToken).toHaveBeenCalledWith(context);
    });
  });
});