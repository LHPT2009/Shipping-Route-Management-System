import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
