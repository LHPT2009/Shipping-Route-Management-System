import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

interface UserRole {
  id: string;
  role: string;
  permissions: string[];
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    const userRole: UserRole = JSON.parse(gqlContext.user_role);

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    if (requiredRoles) {
      const hasRole = requiredRoles.includes(userRole.role);
      if (!hasRole) {
        throw new ForbiddenException('You do not have the required role');
      }
    }

    if (requiredPermissions) {
      const hasPermission = userRole.permissions.some(permission =>
        requiredPermissions.includes(permission)
      );

      if (!hasPermission) {
        throw new ForbiddenException('You do not have the required permissions');
      }
    }

    return true;
  }
}