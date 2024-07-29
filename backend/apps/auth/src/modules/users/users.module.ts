import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UserResolver } from './user.resolver';
import { Role } from './entity/role.entity';
import { Permission } from './entity/permission.entity';
// import { RouteResolver } from './route.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([User, Role, Permission])
  ],
  providers: [UsersService, EmailService, UserResolver],
  exports: [UsersService],
})
export class UsersModule { }
