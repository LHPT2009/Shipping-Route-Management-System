import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from '../auth/types';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) { }

  async createRefreshToken(item: PayloadType) {
    const { userId, email } = item;
    const expiresIn = 7;
    const checkinfo = await this.refreshTokenRepository.findOneBy({ user: { id: userId } });
    if (checkinfo) {
      const newtoken = this.jwtService.sign(
        { userId, email },
        { expiresIn: `${expiresIn}d`, secret: process.env.JWT_SECRET || 'secret' }
      );
      checkinfo.token = newtoken;
      await this.refreshTokenRepository.save(checkinfo);
    } else {
      const newtoken = this.jwtService.sign(
        { userId, email },
        { expiresIn: `${expiresIn}d`, secret: process.env.JWT_SECRET || 'secret' }
      );
      const item = this.refreshTokenRepository.create({ user: { id: userId }, token: newtoken });
      await this.refreshTokenRepository.save(item);
    }
  }

  async refreshAccessToken(context: any): Promise<ResponseDto<{}>> {
    try {
      const accessToken = context.req.headers['access_token'];

      if (!accessToken) {
        throw new CustomValidationError('ERR_AUTH_LOGIN', {});
      }

      const expiresIn = 1;
      const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).toISOString();

      const decoded = this.jwtService.decode(accessToken) as PayloadType;
      const { userId, email } = decoded;

      const checkinfo = await this.refreshTokenRepository.findOneBy({ user: { id: userId } });
      if (!checkinfo) {
        throw new CustomValidationError('ERR_AUTH_LOGIN', {});
      }

      this.jwtService.verify(checkinfo.token, { secret: process.env.JWT_SECRET || 'secret' });

      const newAccessToken = this.jwtService.sign(
        { userId, email },
        { expiresIn: `${expiresIn}d`, secret: process.env.JWT_SECRET || 'secret' }
      );

      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken: newAccessToken, expiresIn: expiresAt }, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_REFRESH_TOKEN, {});
    }
  }

  async remove(context: any) {
    const decode = this.jwtService.decode(context.accessToken)

    const item = decode as PayloadType;
    const { userId } = item;

    const checkinfo = await this.refreshTokenRepository.findOneBy({ user: { id: userId } });
    if (!checkinfo) {
      throw new CustomValidationError(STATUS.ERR_NOT_FOUND, {});
    }

    await this.refreshTokenRepository.remove(checkinfo)
  }
}
