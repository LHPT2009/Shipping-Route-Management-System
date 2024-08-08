import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UserUpdateDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  last_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
