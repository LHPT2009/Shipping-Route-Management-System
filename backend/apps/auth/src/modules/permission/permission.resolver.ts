import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { Permission } from './type/permission.type';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { PermissionEntity } from './entity/permission.entity';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) { }

  @Query(() => ResponseDto<PermissionEntity[]>)
  async getPermissions(): Promise<ResponseDto<PermissionEntity[]>> {
    return this.permissionService.findAll();
  }

  @Query(() => ResponseDto<PermissionEntity>, { nullable: true })
  async getPermission(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<PermissionEntity>> {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => ResponseDto<PermissionEntity>)
  async createPermission(
    @Args('input') input: CreatePermissionDto,
  ): Promise<ResponseDto<PermissionEntity>> {
    return this.permissionService.create(input);
  }

  @Mutation(() => ResponseDto<PermissionEntity>)
  async updatePermission(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePermissionDto,
  ): Promise<ResponseDto<PermissionEntity>> {
    return this.permissionService.update(id, input);
  }

  @Mutation(() => ResponseDto<PermissionEntity>, { nullable: true })
  async removePermission(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<PermissionEntity>> {
    return this.permissionService.remove(id);
  }

  @Query(() => ResponseDto<number>)
  async permissionStatistics(): Promise<ResponseDto<number>> {
    return this.permissionService.permissionStatistics();
  }
}
