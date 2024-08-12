import { Resolver, Query, ID, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './types/user.types';
import { UserEntity } from './entity/user.entity';
import { ResponseDto } from 'common/response/responseDto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Query(() => ResponseDto<UserEntity[]>)
  async getUsers(): Promise<ResponseDto<UserEntity[]>> {
    return await this.userService.findAll();
  }
  @Query(() => ResponseDto<UserEntity>, { nullable: true })
  async getUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userService.findInfoByID(id);
  }
}
