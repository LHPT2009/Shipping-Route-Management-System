import { Args, Mutation, Resolver, Query, ResolveReference } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { SignupResponse } from './types/signup.types';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './types/login.types';
// import { User } from './types/user.types';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation((SignupInput) => SignupResponse)
  // @UseGuards(AuthGuard)
  signup(
    @Args('signupInput')
    signupInput: SignupInput,
  ): Promise<SignupResponse> {
    return this.userService.create(signupInput);
  }
  @Query((LoginInput) => LoginResponse)
  login(
    @Args('loginInput')
    loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => SignupResponse)
  getRole(
    // @Args('userId')
    // userId: LoginInput,
  ): SignupResponse {
    return {
      success: true,
      message: ['Get ok']
    };
  }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: string }) {
  //   console.log('resolveReference in auth', reference.id);
  //   return this.userService.findOneById(reference.id);
  // }
}
