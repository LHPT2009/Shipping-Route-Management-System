import { Resolver, Query, ID, Args, Context, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './types/user.types';
import { UserEntity } from './entity/user.entity';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { Roles } from '../../../../../common/exception/guards/decorator/roles.decorator';
import { Permissions } from '../../../../../common/exception/guards/decorator/permissions.decorator';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { RoleGuard } from '../../../../../common/exception/guards/role.guard';
import { ROLE } from '../../../../../common/constants/role';
import { PERMISSION } from '../../../../../common/constants/permission';
import { UseGuards } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FilterUsersDto } from './dto/user-filter.dto';
import { FilterUsersType } from './types/user-filter.types';
import { UserUpdateRoleDto } from './dto/user-update-role';
import { UpdateStatusUserDto } from './dto/user-update-status';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => ResponseDto<UserEntity[]>)
  async getUsers(
    @Args('input') input: FilterUsersDto,
  ): Promise<ResponseDto<{
    users: FilterUsersType[];
    total: number;
    page: number;
    limit: number;
  }>> {
    return await this.userService.findAll(input);
  }

  @Query(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.READ_DETAIL_USER)
  @UseGuards(AuthGuard, RoleGuard)
  async getUserById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.findInfoByID(id);
  }

  @Query(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN, ROLE.DRIVER)
  @Permissions(PERMISSION.READ_DETAIL_USER)
  @UseGuards(AuthGuard, RoleGuard)
  async getUserByToken(
    @Context() context: any
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.findInfoByToken(context);
  }

  @Mutation(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER)
  @Permissions(PERMISSION.UPDATE_USER)
  @UseGuards(AuthGuard, RoleGuard)
  async updateUserByToken(
    @Context() context: any,
    @Args('input') input: UserUpdateDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.updateUserByToken(context, input);
  }

  @Mutation(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER)
  @Permissions(PERMISSION.UPDATE_USER)
  @UseGuards(AuthGuard, RoleGuard)
  async changePassword(
    @Context() context: any,
    @Args('input') input: ChangePasswordDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.changePassword(context, input);
  }

  @Mutation(() => ResponseDto<UserEntity>)
  async updateRoleForUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') userUpdateRoleDto: UserUpdateRoleDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.updateRoleForUser(id, userUpdateRoleDto);
  }

  @Mutation(() => ResponseDto<UserEntity>)
  async updateStatusUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateStatusUserDto: UpdateStatusUserDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.updateStatusUser(id, updateStatusUserDto);
  }

  @Mutation(() => ResponseDto<UserEntity>, { nullable: true })
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.remove(id);
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<number>)
  async userStatistics(): Promise<ResponseDto<any>> {
    return this.userService.userStatistics();
  }
}
