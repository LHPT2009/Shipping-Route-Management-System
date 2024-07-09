import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';

import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { SignupInput } from 'src/graphql';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(
    @Body()
    userDTO: SignupInput,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  // @Post('login')
  // // @UseGuards(JwtAuthGuard)
  // login(
  //   @Body()
  //   loginDTO: LoginDTO,
  // ) {
  //   return this.authService.login(loginDTO);
  // }
}
