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
import { ResponseDto } from '../../../../../common/response/responseDto';
import { UserEntity } from '../user/entity/user.entity';
import { ConfirmEmailInput } from './dto/confirm_email.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { ResetPasswordInput } from './dto/reset_password.input';
import { ResetPasswordVerifyEmailInput } from './dto/reset_password_verify_email.input';
import { LoginGoogleInput } from './dto/login_google.input';
// import { CustomErrorInterceptor } from '../../../../../common/exception/interceptor/gql-errors.interceptor';

@Resolver()
// @UseInterceptors(CustomErrorInterceptor)
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
  loginWithGoogle(
    @Args('input')
    input: LoginGoogleInput,
  ): Promise<ResponseDto<any>> {
    return this.authService.loginWithGoogle(input);
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
