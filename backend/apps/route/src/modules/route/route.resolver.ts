import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { RoutesService } from './route.service';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from 'common/response/responseDto';

@Resolver(() => Route)
export class RoutesResolver {
  constructor(private routesService: RoutesService) { }

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
