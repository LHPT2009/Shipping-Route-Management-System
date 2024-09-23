import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { RefreshTokenModule } from '../refreshtoken/refreshtoken.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => RefreshTokenModule),
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret'
    }),
  ],
  providers: [AuthService, AuthResolver],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
