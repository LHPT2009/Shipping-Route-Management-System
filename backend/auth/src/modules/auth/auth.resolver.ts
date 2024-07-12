import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { SignupResponse } from './dto/signup.response';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';

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
