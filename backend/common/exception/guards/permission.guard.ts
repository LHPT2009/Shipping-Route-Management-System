import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly roles: string[]) { }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    const user = gqlContext.user_role;
    console.log('User: ', user);
    if (
      user &&
      user.roles &&
      this.roles.some((role) => user.roles.includes(role))
    ) {
      console.log('Pass Case Permission!');
      return true;
    }
    console.log('Failed Case Permission!');
    throw new ForbiddenException('Access denied');
  }
}
