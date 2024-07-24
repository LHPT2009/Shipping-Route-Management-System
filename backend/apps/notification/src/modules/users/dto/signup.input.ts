import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {

    @Field((type) => String)
    first_name: string;

    @Field((type) => String)
    last_name: string;

    @Field((type) => String)
    email: string;

    @Field((type) => String)
    password: string;

    @Field((type) => String)
    passwordConfirm: string;

}
