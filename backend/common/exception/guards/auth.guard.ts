// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// // import { UserService } from "../../../apps/auth/src/modules/user/user.service"

// @Injectable()
// export class AuthGuard implements CanActivate {
//   // constructor(
//   //   private userService: UserService,
//   // ) { }
//   canActivate(context: ExecutionContext): boolean {
//     const ctx = GqlExecutionContext.create(context);

//     const user = { id: 1, username: 'john', roles: ['admin'] };

//     // const reviewInfoUser = this.userService.findInfoByID("1")
//     // console.log(reviewInfoUser)

//     const gqlContext = ctx.getContext();
//     gqlContext.user = user;

//     if (!gqlContext.user) {
//       console.log('Failed Case Auth!');
//       throw new UnauthorizedException('User not authenticated');
//     }
//     console.log('Pass Case Auth!');
//     return true;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly config: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();;

    const accessToken = req.headers.accesstoken;

    if (accessToken === 'null') {
      console.log('No access token');
      throw new UnauthorizedException('Please login to access this resource!');
    }
    else {
      // const decoded = this.jwtService.decode(accessToken);

      const decoded = this.jwtService.verify(accessToken, {
        ignoreExpiration: true,
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      console.log('decode: ', decoded);
      return true;
    }

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private async updateAccessToken(req: any): Promise<void> {
  //   try {
  //     const refreshTokenData = req.headers.refreshtoken as string;

  //     const decoded = this.jwtService.decode(refreshTokenData);

  //     const expirationTime = decoded.exp * 1000;

  //     if (expirationTime < Date.now()) {
  //       throw new UnauthorizedException(
  //         'Please login to access this resource!',
  //       );
  //     }

  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         id: decoded.id,
  //       },
  //     });

  //     const accessToken = this.jwtService.sign(
  //       { id: user.id },
  //       {
  //         secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
  //         expiresIn: '5m',
  //       },
  //     );

  //     const refreshToken = this.jwtService.sign(
  //       { id: user.id },
  //       {
  //         secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
  //         expiresIn: '7d',
  //       },
  //     );

  //     req.accesstoken = accessToken;
  //     req.refreshtoken = refreshToken;
  //     req.user = user;
  //   } catch (error) {
  //     throw new UnauthorizedException(error.message);
  //   }
  // }
}
