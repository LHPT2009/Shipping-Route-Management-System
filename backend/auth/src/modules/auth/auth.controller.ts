import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
  ) {}

  @Get('confirm/:token')
  confirm(@Param('token') token: string,) {
    return this.userService.confirmEmail(token);
  }
}
