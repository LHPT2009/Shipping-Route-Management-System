import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { RoutesService } from './route.service';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { Roles } from 'common/exception/guards/decorator/roles.decorator';
import { ROLE } from 'common/constants/role';
import { Permissions } from 'common/exception/guards/decorator/permissions.decorator';
import { PERMISSION } from 'common/constants/permission';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'common/exception/guards/auth.guard';
import { RoleGuard } from 'common/exception/guards/role.guard';

@Resolver(() => Route)
export class RoutesResolver {
  constructor(private routesService: RoutesService) { }

  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.GET, PERMISSION.POST, PERMISSION.PUT, PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<Route[]>)
  async getRoutes(): Promise<ResponseDto<Route[]>> {
    return this.routesService.findAll();                 
  }

  @Query(() => ResponseDto<Route>, { nullable: true })
  async getRoute(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.findOne(id);
  }

  @Mutation(() => ResponseDto<Route>)
  async createRoute(
    @Args('input') input: CreateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.create(input);
  }

  @Mutation(() => ResponseDto<Route>)
  async updateRoute(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.update(id, input);
  }

  @Mutation(() => ResponseDto<Route>)
  async removeRoute(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.remove(id);
  }
}
