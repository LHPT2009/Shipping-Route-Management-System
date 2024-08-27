import { Resolver, Query, ID, Args, Context, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './types/user.types';
import { UserEntity } from './entity/user.entity';
import { ResponseDto } from 'common/response/responseDto';
import { Roles } from 'common/exception/guards/decorator/roles.decorator';
import { Permissions } from 'common/exception/guards/decorator/permissions.decorator';
import { AuthGuard } from 'common/exception/guards/auth.guard';
import { RoleGuard } from 'common/exception/guards/role.guard';
import { ROLE } from 'common/constants/role';
import { PERMISSION } from 'common/constants/permission';
import { UseGuards } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => ResponseDto<UserEntity[]>)
  async getUsers(): Promise<ResponseDto<UserEntity[]>> {
    return await this.userService.findAll();
  }

  @Query(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.GET, PERMISSION.POST, PERMISSION.PUT, PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  async getUserById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.findInfoByID(id);
  }

  @Query(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.GET, PERMISSION.POST, PERMISSION.PUT, PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  async getUserByToken(
    @Context() context: any
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.findInfoByToken(context);
  }

  @Mutation(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.GET, PERMISSION.POST, PERMISSION.PUT, PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  async updateUserByToken(
    @Context() context: any,
    @Args('input') input: UserUpdateDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.updateUserByToken(context, input);
  }

  @Mutation(() => ResponseDto<UserEntity>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.GET, PERMISSION.POST, PERMISSION.PUT, PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  async changePassword(
    @Context() context: any,
    @Args('input') input: UserUpdateDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.updateUserByToken(context, input);
  }
}
