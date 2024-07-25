import { Args, Mutation, Resolver, Query, ResolveField, ResolveReference, Parent } from '@nestjs/graphql';
import { RouteService } from './route.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Route } from './types/route.types';
import { RouteDto } from './dto/route.input';
import { User } from './types/user.types';

@Resolver((of) => Route)
export class RouteResolver {
  constructor(
    private routeService: RouteService,
  ) { }

  @Query((returns) => [Route])
  // @UseGuards(AuthGuard)
  async getRoutes(): Promise<Route[]> {
    return await this.routeService.findAll();
  }

  @ResolveField((of) => User)
  user(@Parent() route: Route) {
    console.log('user id in  route: ', route.user_id);
    console.log({ __typename: 'User', id: route.user_id })
    return { __typename: 'User', id: route.user_id };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.routeService.forAuthor(reference.id);
  }
}
