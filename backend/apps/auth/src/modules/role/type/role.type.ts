import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../user/types/user.types';
import { Permission } from '../../permission/type/permission.type';

@ObjectType()
export class RoleObjectType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  users: User[];

  @Field(() => [Permission])
  permissions: Permission;
}
