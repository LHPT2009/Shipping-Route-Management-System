import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  permission?: string[];
}
