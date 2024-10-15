import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateContactDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;
}
