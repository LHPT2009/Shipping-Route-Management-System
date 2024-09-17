import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginGoogleInput {
  @Field((type) => String)
  @IsNotEmpty({ message: 'Token is not Empty!' })
  token: string;
}
