import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field((type) => String)
  @IsNotEmpty({ message: 'email is not Empty!' })
  email: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'password is not Empty!' })
  password: string;
}
