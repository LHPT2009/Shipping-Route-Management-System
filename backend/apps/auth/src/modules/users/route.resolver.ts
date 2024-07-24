// import { Args, Mutation, Resolver, Query, ResolveField, ResolveReference, Parent } from '@nestjs/graphql';
// import { UseGuards } from '@nestjs/common';
// import { Route } from './types/route.types';
// import { User } from './types/user.types';
// import { UsersService } from './users.service';

// @Resolver(() => Route)
// export class RouteResolver {
//   constructor(
//     private usersService: UsersService,
//   ) {}

//   @ResolveField((of) => User)
//   user(@Parent() route: Route) {
//     console.log('user in resolve');
//     console.log('user id in user: ', route.user_id);
//     return this.usersService.findOneById(route.id);
//   }

// }
