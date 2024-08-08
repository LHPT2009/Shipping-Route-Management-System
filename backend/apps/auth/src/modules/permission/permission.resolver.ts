import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { Permission } from './type/permission.type';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { ResponseUnion } from 'common/response/responseUnion';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) { }

  @Query(() => ResponseUnion)
  async getPermissions(): Promise<typeof ResponseUnion> {
    return this.permissionService.findAll();
  }

  @Query(() => ResponseUnion, { nullable: true })
  async getPermission(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => ResponseUnion)
  async createPermission(
    @Args('createPermissionDto') createLocationDto: CreatePermissionDto,
  ): Promise<typeof ResponseUnion> {
    return this.permissionService.create(createLocationDto);
  }

  @Mutation(() => ResponseUnion)
  async updatePermission(
    @Args('id', { type: () => ID }) id: string,
    @Args('updatePermissionDto') updateLocationDto: UpdatePermissionDto,
  ): Promise<typeof ResponseUnion> {
    return this.permissionService.update(id, updateLocationDto);
  }

  @Query(() => ResponseUnion, { nullable: true })
  async removePermission(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.permissionService.remove(id);
  }
}
