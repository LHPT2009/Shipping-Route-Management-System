import { Resolver, Query, ID, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './types/user.types';
import { ResponseUnion } from 'common/response/responseUnion';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => ResponseUnion)
  async getUsers(): Promise<typeof ResponseUnion> {
    return await this.userService.findAll();
  }
  @Query(() => ResponseUnion, { nullable: true })
  async getUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.userService.findInfoByID(id);
  }
}
