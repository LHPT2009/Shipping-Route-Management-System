import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SignupInput {
  @Field((type) => String)
  @IsNotEmpty({ message: 'first_name is not Empty!' })
  first_name: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'last_name is not Empty!' })
  last_name: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'email is not Empty!' })
  email: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'password is not Empty!' })
  password: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'passwordConfirm is not Empty!' })
  passwordConfirm: string;
}
