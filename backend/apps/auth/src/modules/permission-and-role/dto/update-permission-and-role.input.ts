import { CreatePermissionAndRoleInput } from './create-permission-and-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionAndRoleInput extends PartialType(CreatePermissionAndRoleInput) {
  @Field(() => Int)
  id: number;
}
