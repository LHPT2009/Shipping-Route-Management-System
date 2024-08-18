import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from "common/constants/status"
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) { }

  async login(loginDTO: LoginInput): Promise<ResponseDto<{}>> {

    try {
      const user = await this.userService.findOne(loginDTO);

      const passwordMatched = await bcrypt.compare(
        loginDTO.password,
        user.password,
      );

      if (passwordMatched) {
        const payload: PayloadType = { email: user.email, userId: user.id };
        await this.refreshTokenService.CreateRefreshToken(payload);
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15s' });
        return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken }, []);
      } else {
        return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);
      }
    }
    catch (error) {
      return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);
    }
  }
}
