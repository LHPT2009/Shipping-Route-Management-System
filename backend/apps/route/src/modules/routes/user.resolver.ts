import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RouteService } from './route.service';
import { Route } from './types/route.types';
import { User } from 'apps/auth/src/modules/users/types/user.types';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly routeService: RouteService) {}

//   @ResolveField((of) => [Route])
//   async route(@Parent() user: User): Promise<Route[]> {
//     console.log('route in user')
//     return await this.routeService.forAuthor(user.id);
//   }
}