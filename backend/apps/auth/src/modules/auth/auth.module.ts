import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { Role } from '../users/entity/role.entity';

@Module({
  imports: [
    // UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),

    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [AuthService, AuthResolver, UsersService, EmailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
