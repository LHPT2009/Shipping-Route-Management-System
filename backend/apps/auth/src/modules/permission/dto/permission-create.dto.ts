import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionDto {

  @Field()
  name: string;
}
