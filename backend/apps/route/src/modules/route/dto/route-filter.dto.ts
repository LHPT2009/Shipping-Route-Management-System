import {
  IsNumber,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterRoutesDto {

  @Field({ nullable: true })
  @IsNumber()
  page?: number;

  @Field({ nullable: true })
  @IsNumber()
  limit?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  departure?: string;

  @Field({ nullable: true })
  arrival?: string;

  @Field({ nullable: true })
  shipping_type?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  sort_field?: string;

  @Field({ nullable: true })
  sort_order?: string;

  @Field({ nullable: true })
  search?: string;
}
