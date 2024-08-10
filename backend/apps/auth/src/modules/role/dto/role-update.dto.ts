import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoleDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
