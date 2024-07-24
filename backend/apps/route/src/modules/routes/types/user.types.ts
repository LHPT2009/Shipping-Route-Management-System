import { Directive, Field, ObjectType, ID } from '@nestjs/graphql';
import { Route } from './route.types';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type)=>ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Route])
  route?: Route[]
}
