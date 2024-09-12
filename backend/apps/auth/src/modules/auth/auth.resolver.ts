import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context
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
import { ResetPasswordInput } from './dto/reset_password.input';
import { ResetPasswordVerifyEmailInput } from './dto/reset_password_verify_email.input';
import { Roles } from 'common/exception/guards/decorator/roles.decorator';
import { ROLE } from 'common/constants/role';
import { Permissions } from 'common/exception/guards/decorator/permissions.decorator';
import { PERMISSION } from 'common/constants/permission';
import { RoleGuard } from 'common/exception/guards/role.guard';

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

  @Mutation(() => ResponseDto<{}>)
  login(
    @Args('input')
    input: LoginInput,
  ): Promise<ResponseDto<any>> {
    return this.authService.login(input);
  }

  @Mutation(() => ResponseDto<{}>)
  loginAdmin(
    @Args('input')
    input: LoginInput,
  ): Promise<ResponseDto<any>> {
    return this.authService.loginAdmin(input);
  }

  @Mutation(() => ResponseDto<{}>)
  resetPasswordVerifyEmail(
    @Args('input') input: ResetPasswordVerifyEmailInput,
  ): Promise<ResponseDto<any>> {
    return this.userService.resetPasswordVerifyEmail(input);
  }

  @Mutation(() => ResponseDto<{}>)
  resetPassword(
    @Args('input') input: ResetPasswordInput,
  ): Promise<ResponseDto<any>> {
    return this.userService.resetPassword(input);
  }

  @Mutation(() => ResponseDto<{}>)
  confirmEmail(
    @Args('input')
    input: ConfirmEmailInput,
  ): Promise<ResponseDto<any>> {
    return this.userService.confirmEmail(input);
  }

  @Query(() => ResponseDto<{}>, { nullable: true })
  @UseGuards(AuthGuard)
  async logoutAccount(@Context() context: any): Promise<ResponseDto<{}>> {
    return this.authService.logout(context);
  }
}
