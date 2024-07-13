import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { SignupResponse } from './dto/signup.response';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation((SignupInput) => SignupResponse)  
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
}
