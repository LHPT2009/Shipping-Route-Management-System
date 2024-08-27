import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class ChangePasswordDto {

  @Field()
  @IsNotEmpty({ message: 'Password should not be empty' })
  currentPassword: string;

  @Field()
  @IsNotEmpty({ message: 'New password should not be empty' })
  newPassword: string;

  @Field()
  @IsNotEmpty({ message: 'Password confirm should not be empty' })
  passwordConfirm: string;

}
