import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput {

    @Field((type) => String)
    email: string;

    @Field((type) => String)
    password: string;

}
