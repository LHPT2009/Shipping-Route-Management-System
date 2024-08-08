import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
