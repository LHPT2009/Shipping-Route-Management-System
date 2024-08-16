import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ConfirmEmailInput {
  @Field((type) => String)
  @IsNotEmpty({ message: 'Verify token is not Empty!' })
  verifyToken: string;
}
