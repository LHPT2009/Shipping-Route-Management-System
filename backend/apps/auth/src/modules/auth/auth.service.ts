import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from "common/constants/status"
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(loginDTO: LoginInput): Promise<ResponseDto<{}>> {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      const payload: PayloadType = { email: user.email, userId: user.id };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken, refreshToken }, []);
    } else {
      return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, STATUS.INTERNAL_SERVER_ERROR, null, null);
    }
  }
}
