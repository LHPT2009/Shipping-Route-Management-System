import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ResetPasswordInput {

  @Field((type) => String)
  @IsNotEmpty({ message: 'Verify token is not Empty!' })
  verifyToken: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'New password is not Empty!' })
  newPassword: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'Password confirm is not Empty!' })
  passwordConfirm: string;
}
