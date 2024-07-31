import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  ResolveReference,
  Parent,
} from '@nestjs/graphql';
import { RoutesService } from './routes.service';
// import { RouteType } from '../database/types/routes.type';
import { Route } from '../database/entities/routes.entity';

@Resolver(() => Route)
export class RoutesResolver {
  constructor(private routesService: RoutesService) {}

  @Query(() => Route)
  async getRoutes(): Promise<Route[]> {
    return this.routesService.findAll();
  }

  // @Query((returns) => [Route])
  // @UseGuards(AuthGuard)
  // async getRoutes(): Promise<Route[]> {
  //   return await this.routeService.findAll();
  // }

  // @ResolveField((of) => User)
  // user(@Parent() route: Route) {
  //   console.log('user id in  route: ', route.user_id);
  //   console.log({ __typename: 'User', id: route.user_id })
  //   return { __typename: 'User', id: route.user_id };
  // }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: string }) {
  //   return this.routeService.forAuthor(reference.id);
  // }
}
