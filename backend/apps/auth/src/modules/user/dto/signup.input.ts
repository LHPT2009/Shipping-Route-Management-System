import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsNotEmpty({ message: 'First name should not be empty' })
  first_name: string;

  @Field()
  @IsNotEmpty({ message: 'Last name should not be empty' })
  last_name: string;

  @Field()
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Password confirmation should not be empty' })
  passwordConfirm: string;
}
