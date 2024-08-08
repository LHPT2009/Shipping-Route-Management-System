import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseUnion } from 'common/response/responseUnion';
import { ResponseDto } from 'common/response/responseDto';
import { ResponseErrorDto } from 'common/response/responseError.dto';
import { STATUS, STATUS_CODE } from "common/constants/status"
import { VALIDATION } from 'common/constants/validation';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(loginDTO: LoginInput): Promise<typeof ResponseUnion> {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      const response = new ResponseDto<{}>();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData({ accessToken: this.jwtService.sign(payload) });
      return response;
    } else {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.FORBIDDEN);
      response.setMessage(STATUS.FORBIDDEN);
      response.setError(VALIDATION.PASSWORDS_DO_NOT_MATCH);
      return response;
    }
  }
}
