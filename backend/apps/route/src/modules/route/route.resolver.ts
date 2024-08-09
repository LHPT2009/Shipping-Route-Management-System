import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { RoutesService } from './route.service';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseUnion } from '../../../../../common/response/responseUnion';

@Resolver(() => Route)
export class RoutesResolver {
  constructor(private routesService: RoutesService) { }

  @Query(() => ResponseUnion)
  async getRoutes(): Promise<typeof ResponseUnion> {
    return this.routesService.findAll();
  }

  @Query(() => ResponseUnion, { nullable: true })
  async getRoute(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.routesService.findOne(id);
  }

  @Mutation(() => ResponseUnion)
  async createRoute(
    @Args('createRoutesDto') createRoutesDto: CreateRoutesDto,
  ): Promise<typeof ResponseUnion> {
    return this.routesService.create(createRoutesDto);
  }

  @Mutation(() => ResponseUnion)
  async updateRoute(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateRoutesDto') updateRoutesDto: UpdateRoutesDto,
  ): Promise<typeof ResponseUnion> {
    return this.routesService.update(id, updateRoutesDto);
  }

  @Mutation(() => ResponseUnion)
  async removeRoute(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.routesService.remove(id);
  }
}
