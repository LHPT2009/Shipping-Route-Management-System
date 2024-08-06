// import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';
// import { RoleObjectType } from '../../role/type/role.type';

@InputType()
export class CreatePermissionDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
