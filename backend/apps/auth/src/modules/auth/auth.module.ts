import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    // UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    // ArtistsModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, UsersService, EmailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
