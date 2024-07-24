import { Args, Mutation, Resolver, Query, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { User } from './types/user.types';
import { Route } from './types/route.types';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UsersService,
  ) {}

  @Query((returns) => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ResolveField((of) => [User])
  async user(@Parent() route: Route): Promise<User> {
    console.log('route in user')
    return await this.userService.findOneById(route.user_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    console.log('resolveReference in auth', reference.id);
    return this.userService.findOneById(reference.id);
  }
}
