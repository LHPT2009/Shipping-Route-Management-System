import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'apps/auth/src/modules/refreshtoken/refreshtoken.service';
import * as dotenv from 'dotenv';
import { CustomValidationError } from '../validation/custom-validation-error';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const accessToken = req.headers.access_token;

    if (!accessToken || accessToken === 'null') {
      throw new CustomValidationError('ERR_AUTH_LOGIN', {});
    }
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET || 'secret',
      });
      ctx.getContext().token = { accessToken, status: "1" }
      console.log(decoded)
      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const item = this.refreshTokenService.RefreshAccessToken(accessToken);
        throw new CustomValidationError('ERR_TOKEN_EXPIRED', {});
      } else if (err.name === 'JsonWebTokenError') {
        throw new CustomValidationError('ERR_TOKEN_INVALID', {});
      } else {
        throw new CustomValidationError('An error occurred, please try again!', {});
      }
    }
  }
}