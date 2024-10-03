import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PermissionToRoleDto {
  @Field()
  roleId: string;
  @Field(() => [String])
  permissionIds: string[];
}
