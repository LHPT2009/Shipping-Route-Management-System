import {
  Args,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseDto } from 'common/response/responseDto';
import { UserEntity } from '../user/entity/user.entity';
import { ConfirmEmailInput } from './dto/confirm_email.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'common/exception/guards/auth.guard';
import { PermissionGuard } from 'common/exception/guards/permission.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Mutation(() => ResponseDto<UserEntity>)
  signup(
    @Args('input')
    input: SignupInput,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.create(input);
  }

  // @UseGuards(PermissionGuard)
  @UseGuards(AuthGuard)
  @Mutation(() => ResponseDto<{}>)
  login(
    @Args('input')
    input: LoginInput,
  ): Promise<ResponseDto<any>> {
    return this.authService.login(input);
  }

  @Mutation(() => ResponseDto<{}>)
  confirmEmail(
    @Args('input')
    input: ConfirmEmailInput,
  ): Promise<ResponseDto<any>> {
    return this.userService.confirmEmail(input);
  }
}
