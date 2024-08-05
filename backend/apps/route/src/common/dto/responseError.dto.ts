import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ResponseErrorDto {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;

  @Field()
  error: string;

  setStatus(status: number): void {
    this.status = status;
  }

  setMessage(message: string): void {
    this.message = message;
  }

  setError(error: string): void {
    this.error = error;
  }
}
