import { Role } from '../../role/type/role.type';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Permission {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Role], { nullable: true })
  role: Role[];
}
