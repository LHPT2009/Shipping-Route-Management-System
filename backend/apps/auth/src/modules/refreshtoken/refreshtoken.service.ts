import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from '../auth/types';

@Injectable()
export class RefreshTokenService {
    constructor(
        private refreshTokenRepository: RefreshTokenRepository,
        private readonly jwtService: JwtService,
    ) { }

    // async create(createRefreshTokenDto: CreateRefreshTokenDto): Promise<ResponseDto<RefreshToken>> {
    //     try {
    //         const item = this.refreshTokenRepository.create(createRefreshTokenDto);
    //         await this.refreshTokenRepository.save(item);
    //         return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, item, []);
    //     } catch (error) {
    //         return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);
    //     }
    // }

    // async update(
    //     id: string,
    //     updateRefreshTokenDto: UpdateRefreshTokenDto,
    // ): Promise<ResponseDto<RefreshToken>> {
    //     try {
    //         const refreshTokenResponse = await this.findOne(id);
    //         const refreshToken = refreshTokenResponse.data as RefreshToken;
    //         Object.assign(refreshToken, updateRefreshTokenDto);
    //         await this.refreshTokenRepository.save(refreshToken);
    //         return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, refreshToken, []);

    //     } catch (error) {
    //         return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);

    //     }
    // }

    async CreateRefreshToken(item: PayloadType) {
        console.log(item.email + " - " + item.userId)
    }

    RefreshAccessToken(token: string) {
        const decode = this.jwtService.decode(token);
        const payload: PayloadType = { email: decode.email, userId: decode.userId };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d', secret: process.env.JWT_SECRET || 'secret' });
        return { accesstoken: refreshToken, expiresIn: "" }
    }
}
