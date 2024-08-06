import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class ResponseDto<T> {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data?: T;

  setStatus(status: number): void {
    this.status = status;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  setData(data: T): void {
    this.data = data;
  }
}
