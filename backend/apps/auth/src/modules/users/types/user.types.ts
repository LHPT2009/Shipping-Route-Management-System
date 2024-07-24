import { Directive, Field, ObjectType, ID } from '@nestjs/graphql';
// import { Route } from './route.types';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {

  @Field((type) => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  active: boolean;

  // @Field(() => [Route])
  // route: Route[];

}