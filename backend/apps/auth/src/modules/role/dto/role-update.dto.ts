import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoleDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
