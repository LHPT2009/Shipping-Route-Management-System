import { IsOptional, IsString, IsArray } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  permission?: string[];
}
