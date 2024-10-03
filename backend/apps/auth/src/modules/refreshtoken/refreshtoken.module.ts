import { Module } from '@nestjs/common';
import { RefreshTokenEntity } from './entity/refreshtoken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenService } from './refreshtoken.service';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenResolver } from './refreshtoken.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity])
  ],
  providers: [RefreshTokenService, RefreshTokenResolver, RefreshTokenRepository, JwtService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule { }
