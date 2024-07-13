import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {
    @Field((type) => Boolean)
    success: Boolean;

    @Field((type) => [String])
    message: String[];

    @Field((type) => String)
    accessToken: String;
}
