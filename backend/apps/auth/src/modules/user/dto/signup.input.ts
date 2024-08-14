import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Fullname should not be empty' })
  fullname: string;

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
