import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';


@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
  ) {}

  @Get('confirm/:token')
  confirm(@Param('token') token: string,) {
    return this.userService.confirmEmail(token);
  }

  @Get('role/:userId')
  getRole(@Param('userId') userId: string,) {
    return this.userService.getRole(userId);
  }
}
