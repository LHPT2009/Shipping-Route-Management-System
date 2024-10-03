import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { Permission } from './type/permission.type';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { PermissionEntity } from './entity/permission.entity';
import { Roles } from 'common/exception/guards/decorator/roles.decorator';
import { ROLE } from 'common/constants/role';
import { PERMISSION } from 'common/constants/permission';
import { Permissions } from 'common/exception/guards/decorator/permissions.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'common/exception/guards/auth.guard';
import { RoleGuard } from 'common/exception/guards/role.guard';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) { }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_PERMISSION)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<PermissionEntity[]>)
  async getPermissions(): Promise<ResponseDto<PermissionEntity[]>> {
    return this.permissionService.findAll();
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_DETAIL_PERMISSION)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<PermissionEntity>, { nullable: true })
  async getPermission(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<PermissionEntity>> {
    return this.permissionService.findOne(id);
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_PERMISSION)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<number>)
  async permissionStatistics(): Promise<ResponseDto<number>> {
    return this.permissionService.permissionStatistics();
  }
}
