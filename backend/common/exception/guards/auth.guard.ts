import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) { }
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const accessToken = req.headers.access_token;
    // const userRole = req.headers.user_role;

    if (!accessToken || accessToken === 'null') {
      throw new UnauthorizedException('Please login to access this resource!');
    }
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      console.log(decoded)
      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired, please login again!');
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token, please login again!');
      } else {
        throw new UnauthorizedException('An error occurred, please try again!');
      }
    }
  }
}