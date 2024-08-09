import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

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
