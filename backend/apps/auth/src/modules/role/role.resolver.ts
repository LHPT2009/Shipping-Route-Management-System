import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './type/role.type';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { UseGuards } from '@nestjs/common';
import { ResponseDto } from 'common/response/responseDto';
import { RoleEntity } from './entity/role.entity';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) { }

  @Query(() => ResponseDto<RoleEntity[]>)
  async getRoles(): Promise<ResponseDto<RoleEntity[]>> {
    return this.roleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => ResponseDto<RoleEntity>, { nullable: true })
  async getRole(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<RoleEntity>> {
    return this.roleService.findOne(id);
  }

  @Mutation(() => ResponseDto<RoleEntity>)
  async createRole(
    @Args('input') input: CreateRoleDto,
  ): Promise<ResponseDto<RoleEntity>> {
    return this.roleService.create(input);
  }

  @Mutation(() => ResponseDto<RoleEntity>)
  async updateRole(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRoleDto,
  ): Promise<ResponseDto<RoleEntity>> {
    return this.roleService.update(id, input);
  }

  @Query(() => ResponseDto<RoleEntity>, { nullable: true })
  async removeLocation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<RoleEntity>> {
    return this.roleService.remove(id);
  }

  @Mutation(() => ResponseDto<RoleEntity>)
  async addPermissionToRole(
    @Args('input') input: PermissionToRoleDto,
  ) {
    return this.roleService.addPermissionToRole(input);
  }

  @Mutation(() => ResponseDto<RoleEntity>)
  async removePermissionFromRole(
    @Args('input') input: PermissionToRoleDto,
  ) {
    return this.roleService.removePermissionFromRole(input);
  }
}
