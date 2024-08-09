import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirm: string;
}
