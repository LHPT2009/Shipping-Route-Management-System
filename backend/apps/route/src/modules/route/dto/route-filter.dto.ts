import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';
import { StatusEnum } from '../interface/routes.interface';
import { Location } from '../../location/type/location.type';
import { Transport } from '../../transport/type/transport.type';

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
}
