import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new CustomValidationError('ERR_TOKEN_EXPIRED', {});
      }
      if (err.name === 'JsonWebTokenError') {
        throw new CustomValidationError('ERR_TOKEN_INVALID', {});
      }
      throw new CustomValidationError('ERR_UNKNOWN_AUTH_ERROR', {});
    }
  }
}