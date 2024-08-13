import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { UserService } from "../../../apps/auth/src/modules/user/user.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private userService: UserService,
  ) { }
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    // const user = { id: 1, username: 'john', roles: ['admin'] };

    // const reviewInfoUser = this.userService.findInfoByID("1")
    // console.log(reviewInfoUser)
    // gqlContext.user = user;

    // if (!gqlContext.user) {
    //   console.log('Failed Case Auth!');
    //   throw new UnauthorizedException('User not authenticated');
    // }
    // console.log('Pass Case Auth!');
    // return true;

    const { req } = ctx.getContext();

    const accessToken = req.headers.access_token;
    const userRole = JSON.parse(req.headers.user_role);  

    if (accessToken === 'null') {
      console.log('No access token');
      throw new UnauthorizedException('Please login to access this resource!');
    }
    else {
      console.log("Access token: ", accessToken);
      console.log("------------------------");
      console.log("User role: ", userRole);
      //If permssion is not allowed, do not allow access
      //Else do allow access
      return true;
    }
  }
}