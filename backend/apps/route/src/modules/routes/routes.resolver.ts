import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { RoutesService } from './routes.service';

import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseUnion } from '../../common/dto/responseUnion';



@Resolver(() => Route)
export class RoutesResolver {
  constructor(
    private routesService: RoutesService,
  ) {}

  // @Query(() => Route)
  // async getRoutes(): Promise<Route[]> {
  //   return this.routesService.findAll();
  // }
  
  // @Query(() => [String])
  // async getMessages(@Args('topic') topic: string): Promise<any[]> {
  //   return this.messageStore.getMessages(topic);
  // }
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
