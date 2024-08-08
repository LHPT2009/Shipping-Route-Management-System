import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePermissionAndRoleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
