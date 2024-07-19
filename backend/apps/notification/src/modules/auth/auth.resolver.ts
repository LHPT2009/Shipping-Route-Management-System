import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { SignupResponse } from './types/signup.types';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './types/login.types';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Mutation((SignupInput) => SignupResponse)
  // // @UseGuards(AuthGuard)
  // signup(
  //   @Args('signupInput')
  //   signupInput: SignupInput,
  // ): Promise<SignupResponse> {
  //   return this.userService.create(signupInput);
  // }
  // @Query((LoginInput) => LoginResponse)
  // login(
  //   @Args('loginInput')
  //   loginInput: LoginInput,
  // ): Promise<LoginResponse> {
  //   return this.authService.login(loginInput);
  // }
}
