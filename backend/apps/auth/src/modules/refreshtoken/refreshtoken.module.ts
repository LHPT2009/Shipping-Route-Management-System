import { Module } from '@nestjs/common';
import { RefreshTokenEntity } from './entity/refreshtoken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenService } from './refreshtoken.service';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([RefreshTokenEntity]),
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET || 'secret',
        // }),
    ],
    providers: [RefreshTokenService, RefreshTokenRepository, JwtService],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule { }
