import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SignupInput {
  @Field((type) => String)
  @IsNotEmpty({ message: 'Username is not empty' })
  username: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'Email is not empty' })
  email: string;

  @Field((type) => String)  
  @IsNotEmpty({ message: 'Password is not empty' })
  password: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'Password Confirm is not empty' })
  passwordConfirm: string;
}
