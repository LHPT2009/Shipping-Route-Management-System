import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignupInput {

    @Field((type) => String)
    firstName: string;

    @Field((type) => String)
    lastName: string;

    @Field((type) => String)
    email: string;

    @Field((type) => String)
    password: string;

    @Field((type) => String)
    passwordConfirm: string;

}
