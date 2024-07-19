import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignupResponse {
    
    @Field((type) => Boolean)
    success: Boolean;

    @Field((type) => [String])
    message: String[];
}
