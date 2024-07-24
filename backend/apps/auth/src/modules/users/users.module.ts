import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UserResolver } from './user.resolver';
// import { RouteResolver } from './route.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, EmailService, JwtService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
