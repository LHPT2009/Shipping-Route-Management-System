import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';
import { RoleObjectType } from '../../role/type/role.type';

@InputType()
export class UpdatePermissionDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}
