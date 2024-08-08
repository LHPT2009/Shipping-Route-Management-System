// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { PermissionAndRoleService } from './permission-and-role.service';
// import { PermissionAndRole } from './entities/permission-and-role.entity';
// import { CreatePermissionAndRoleInput } from './dto/create-permission-and-role.input';
// import { UpdatePermissionAndRoleInput } from './dto/update-permission-and-role.input';

// @Resolver(() => PermissionAndRole)
// export class PermissionAndRoleResolver {
//   constructor(private readonly permissionAndRoleService: PermissionAndRoleService) {}

//   @Mutation(() => PermissionAndRole)
//   createPermissionAndRole(@Args('createPermissionAndRoleInput') createPermissionAndRoleInput: CreatePermissionAndRoleInput) {
//     return this.permissionAndRoleService.create(createPermissionAndRoleInput);
//   }

//   @Query(() => [PermissionAndRole], { name: 'permissionAndRole' })
//   findAll() {
//     return this.permissionAndRoleService.findAll();
//   }

//   @Query(() => PermissionAndRole, { name: 'permissionAndRole' })
//   findOne(@Args('id', { type: () => Int }) id: number) {
//     return this.permissionAndRoleService.findOne(id);
//   }

//   @Mutation(() => PermissionAndRole)
//   updatePermissionAndRole(@Args('updatePermissionAndRoleInput') updatePermissionAndRoleInput: UpdatePermissionAndRoleInput) {
//     return this.permissionAndRoleService.update(updatePermissionAndRoleInput.id, updatePermissionAndRoleInput);
//   }

//   @Mutation(() => PermissionAndRole)
//   removePermissionAndRole(@Args('id', { type: () => Int }) id: number) {
//     return this.permissionAndRoleService.remove(id);
//   }
// }
