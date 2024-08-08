import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RoleObjectType } from '../../role/type/role.type';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  active: boolean;

  @Field(() => [RoleObjectType], { nullable: true })
  role: RoleObjectType[];
}
