import { Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from "common/constants/status"
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) { }

  async handleLogin(loginDTO: LoginInput, user: UserEntity): Promise<ResponseDto<{}>> {
    if (!user.active) {
      throw new CustomValidationError(STATUS.ERR_VALIDATION, { email: ['Your account has not been activated.'] });
    }

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      const expiredIn = 1;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // day

      // const expiredIn = 5; //5s
      // const expiresAt = new Date(Date.now() + 5000).toISOString(); // 5s

      const payload: PayloadType = { email: user.email, userId: user.id };
      await this.refreshTokenService.createRefreshToken(payload);
      const accessToken = this.jwtService.sign(payload, { expiresIn: `${expiredIn}d` });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken: accessToken, expiresIn: expiresAt }, []);

    } else {
      throw new CustomValidationError(STATUS.ERR_VALIDATION, { password: ['Password is wrong. Please try again'] });
    }

  }

  async login(loginDTO: LoginInput): Promise<ResponseDto<{}>> {
    const user = await this.userService.findOne(loginDTO);
    return await this.handleLogin(loginDTO, user);
  }

  async loginAdmin(loginDTO: LoginInput): Promise<ResponseDto<{}>> {
    const user = await this.userService.findOne(loginDTO);
    if (user.roles.name !== 'ADMIN') {
      throw new CustomValidationError(STATUS.ERR_ACTIVE, { username: ['You do not have permission to access this page.'] });
    }
    return await this.handleLogin(loginDTO, user);
  }

  async logout(context: any): Promise<ResponseDto<{}>> {
    await this.refreshTokenService.remove(context);
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
  }
}
