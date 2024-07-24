import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UserResolver } from './user.resolver';
// import { RouteResolver } from './route.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService, EmailService, UserResolver],
  exports: [UsersService],
})
export class UsersModule { }
