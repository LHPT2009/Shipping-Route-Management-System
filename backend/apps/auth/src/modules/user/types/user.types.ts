import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../role/type/role.type';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  fullname: string;

  @Field()
  username: string;

  @Field()
  otp: string;

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

  @Field(() => [Role], { nullable: true })
  role: Role[];
}
