import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@shareable')
export class RefreshToken {
    @Field(() => ID)
    id: string;

    @Field()
    userId: string;

    @Field()
    token: string;
}
