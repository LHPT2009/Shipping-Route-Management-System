import {
  Args,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { ResponseUnion } from 'common/response/responseUnion';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Mutation(() => ResponseUnion)
  signup(
    @Args('signupInput')
    signupInput: SignupInput,
  ): Promise<typeof ResponseUnion> {
    return this.userService.create(signupInput);
  }
  @Mutation(() => ResponseUnion)
  login(
    @Args('loginInput')
    loginInput: LoginInput,
  ): Promise<typeof ResponseUnion> {
    return this.authService.login(loginInput);
  }
}
