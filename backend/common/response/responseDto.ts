import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class ResponseDto<T> {
  @Field(() => Int)
  @Directive('@shareable')
  status: number;

  @Field()
  @Directive('@shareable')
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Directive('@shareable')
  data?: T;

  @Field(() => GraphQLJSON, { nullable: true })
  @Directive('@shareable')
  error?: any;

  constructor(status: number, message: string, data?: T, error?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
