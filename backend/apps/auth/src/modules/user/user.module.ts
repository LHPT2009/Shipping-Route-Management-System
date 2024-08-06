import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, EmailService, UserResolver, UserRepository],
  exports: [UserService],
})
export class UserModule {}
