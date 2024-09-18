import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { RoleModule } from '../role/role.module';
import { KafkaModule } from '../kafka/kafka.module';

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
    KafkaModule,
  ],
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule { }
