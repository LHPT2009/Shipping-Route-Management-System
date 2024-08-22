import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ResetPasswordVerifyEmailInput {

  @Field((type) => String)
  @IsNotEmpty({ message: 'Email is not Empty!' })
  email: string;
}
