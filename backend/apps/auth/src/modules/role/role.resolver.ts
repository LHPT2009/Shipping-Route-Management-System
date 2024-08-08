import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { RoleObjectType } from './type/role.type';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { ResponseUnion } from 'common/response/responseUnion';

@Resolver(() => RoleObjectType)
export class RoleResolver {
  constructor(private roleService: RoleService) { }

  @Query(() => ResponseUnion)
  async getRoles(): Promise<typeof ResponseUnion> {
    return this.roleService.findAll();
  }

  @Query(() => ResponseUnion, { nullable: true })
  async getRole(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.roleService.findOne(id);
  }

  @Mutation(() => ResponseUnion)
  async createRole(
    @Args('createRoleDto') createRoleDto: CreateRoleDto,
  ): Promise<typeof ResponseUnion> {
    return this.roleService.create(createRoleDto);
  }

  @Mutation(() => ResponseUnion)
  async updateRole(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateRoleDto') updateRoleDto: UpdateRoleDto,
  ): Promise<typeof ResponseUnion> {
    return this.roleService.update(id, updateRoleDto);
  }

  @Query(() => ResponseUnion, { nullable: true })
  async removeLocation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.roleService.remove(id);
  }
}
