import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class ResponseDto<T> {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;

  @Field(() => GraphQLJSON)
  data?: T;

  @Field(() => GraphQLJSON)
  error?: any;

  constructor(status: number, message: string, data?: T, error?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
