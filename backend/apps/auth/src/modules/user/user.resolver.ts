import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
// import { UseGuards } from '@nestjs/common';
import { User } from './types/user.types';
// import { AuthGuard } from '../auth/guards/auth.guard';
import { ResponseUnion } from '../../common/dto/responseUnion';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => ResponseUnion)
  // @UseGuards(AuthGuard)
  async getUsers(): Promise<typeof ResponseUnion> {
    return await this.userService.findAll();
  }
}
