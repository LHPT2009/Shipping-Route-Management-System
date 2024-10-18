import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from "../../../../../common/constants/status"
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { UserEntity } from '../user/entity/user.entity';
import { LoginGoogleInput } from './dto/login_google.input';
import { Auth, google } from 'googleapis';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private userRepository: UserRepository,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

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
    if (user.roles.name === 'ADMIN') {
      throw new CustomValidationError(STATUS.ERR_ACTIVE, { username: ['You do not have permission to access this page.'] });
    }
    return await this.handleLogin(loginDTO, user);
  }

  async loginWithGoogle(loginDTO: LoginGoogleInput): Promise<ResponseDto<{}>> {
    try {
      const tokenInfo = await this.oauthClient.getTokenInfo(loginDTO.token);
      
      const user = await this.userRepository.findOne({
        where: { email: tokenInfo.email },
        relations: ['roles'],
      });

      let userAfterCreate: UserEntity;

      if (!user) {
        userAfterCreate = await this.userService.createGoogleAccount(tokenInfo.email);
      }

      const expiredIn = 1;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      const payload: PayloadType = { email: tokenInfo.email, userId: user ? user.id : userAfterCreate.id };
      await this.refreshTokenService.createRefreshToken(payload);
      const accessToken = this.jwtService.sign(payload, { expiresIn: `${expiredIn}d` });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { accessToken: accessToken, expiresIn: expiresAt }, []);

    } catch (error) {
      console.log(error);
    }
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
