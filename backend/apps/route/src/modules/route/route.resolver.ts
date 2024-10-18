import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { RoutesService } from './route.service';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { Roles } from '../../../../../common/exception/guards/decorator/roles.decorator';
import { ROLE } from '../../../../../common/constants/role';
import { Permissions } from '../../../../../common/exception/guards/decorator/permissions.decorator';
import { PERMISSION } from '../../../../../common/constants/permission';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { RoleGuard } from '../../../../../common/exception/guards/role.guard';
import { FilterRoutesDto } from './dto/route-filter.dto';
import { FilterRouteType } from './type/route-filter.type';

@Resolver(() => Route)
export class RoutesResolver {
  constructor(private routesService: RoutesService) { }

  @Roles(ROLE.CUSTOMER, ROLE.ADMIN, ROLE.DRIVER)
  @Permissions(PERMISSION.READ_LIST_ROUTE)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<Route[]>)
  async getRoutes(
    @Args('input') input: FilterRoutesDto,
  ): Promise<ResponseDto<{
    routes: FilterRouteType[];
    total: number;
    page: number;
    limit: number;
  }>> {
    return this.routesService.findAll(input);
  }

  @Roles(ROLE.CUSTOMER, ROLE.ADMIN, ROLE.DRIVER)
  @Permissions(PERMISSION.READ_DETAIL_ROUTE)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<Route>, { nullable: true })
  async getRoute(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.findOne(id);
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.CREATE_ROUTE)
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => ResponseDto<Route>)
  async createRoute(
    @Args('input') input: CreateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.create(input);
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.UPDATE_ROUTE)
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => ResponseDto<Route>)
  async updateRoute(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.update(id, input);
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.DELETE_ROUTE)
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => ResponseDto<Route>)
  async removeRoute(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Route>> {
    return this.routesService.remove(id);
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_ROUTE)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<Route>)
  async routeStatistics(): Promise<ResponseDto<any>> {
    return this.routesService.routeStatistics();
  }

}
