import { Directive, Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from './user.types';

@ObjectType()
@Directive('@key(fields: "id")')
export class Route {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

}