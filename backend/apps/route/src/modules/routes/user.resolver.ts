import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RouteService } from './route.service';
import { Route } from './types/route.types';
import { User } from 'apps/auth/src/modules/users/types/user.types';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly routeService: RouteService) {}

  // @ResolveField((of) => [Route])
  // route(@Parent() user: User): Promise<Route[]> {
  //   console.log('route in user')
  //   return this.routeService.forAuthor(user.id);
  // }
}