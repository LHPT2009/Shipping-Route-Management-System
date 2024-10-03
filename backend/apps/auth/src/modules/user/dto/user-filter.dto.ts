import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterUsersDto {

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Page should not be empty' })
  page?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty({ message: 'Limit should not be empty' })
  limit?: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  permission?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  sort_field?: string;

  @Field({ nullable: true })
  sort_order?: string;
}
