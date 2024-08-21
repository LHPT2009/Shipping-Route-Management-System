import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext();
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    if (requiredRoles) {
      const hasRole = () => user.roles.some(role => requiredRoles.includes(role.name));
      if (!hasRole()) {
        throw new ForbiddenException('You do not have the required role');
      }
    }

    if (requiredPermissions) {
      const hasPermission = () => user.roles
        .flatMap(role => role.permissions.map(permission => permission.name))
        .some(permission => requiredPermissions.includes(permission));

      if (!hasPermission()) {
        throw new ForbiddenException('You do not have the required permissions');
      }
    }

    return true;
  }
}