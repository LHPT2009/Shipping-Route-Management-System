import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from "common/constants/status"
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { validUsernameOrEmail } from 'common/exception/validation/username-email.validation';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) { }

  async login(loginDTO: LoginInput): Promise<ResponseDto<{}>> {

    if (!validUsernameOrEmail(loginDTO.email)) {
      throw new CustomValidationError('Invalid input', { username: ['Username is invalid'] });
    }

    const user = await this.userService.findOne(loginDTO);

    if(!user.active){
      throw new CustomValidationError(STATUS.VALIDATION_ERROR, { email: ['Your email hasn’t been confirmed yet. Please check your inbox to activate your account.'] });
    }

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      const expiredIn = 1;
      // const expiresAt = new Date(Date.now() + 2 * 1000).toISOString(); // 2s
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // day

      const payload: PayloadType = { email: user.email, userId: user.id };
      await this.refreshTokenService.createRefreshToken(payload);
      const accessToken = this.jwtService.sign(payload, { expiresIn: `${expiredIn}s` });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken: accessToken, expiresIn: expiresAt }, []);

    } else {
      throw new CustomValidationError(STATUS.VALIDATION_ERROR, { password: ['Password is wrong. Please try again'] });
    }

  }
}
