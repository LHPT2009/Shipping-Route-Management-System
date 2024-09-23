import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
