import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoleDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
