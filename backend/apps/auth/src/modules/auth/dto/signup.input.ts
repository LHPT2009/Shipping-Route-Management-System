import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SignupInput {
  @Field((type) => String)
  @IsNotEmpty({ message: 'Fullname is not Empty!' })
  fullname: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'Username is not Empty!' })
  username: string;

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
