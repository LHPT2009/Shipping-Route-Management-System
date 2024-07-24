import { Directive, Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import {User} from '../types/user.types';

@InputType()
@Directive('@key(fields: "id")')
export class RouteDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  user_id: number;

  @Field(() => User)
  user: User;
}