import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, EmailService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
