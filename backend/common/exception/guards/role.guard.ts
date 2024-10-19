import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { CustomValidationError } from '../validation/custom-validation-error';
import { STATUS } from '../../../common/constants/status';

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

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.includes(userRole.role);
      if (!hasRole) {
        throw new CustomValidationError(STATUS.ERR_ROLE_USER, {});
      }
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      if (!userRole.permissions) {
        throw new CustomValidationError(STATUS.ERR_PERMISSION_USER, {});
      }

      const hasPermission = userRole.permissions.some(permission =>
        requiredPermissions.includes(permission)
      );

      if (!hasPermission) {
        throw new CustomValidationError(STATUS.ERR_PERMISSION_USER, {});
      }
    }

    return true;
  }
}