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
export class UpdateRoutesDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  departure: Location;

  @Field()
  @IsNotEmpty()
  @IsDate()
  departure_time: Date;

  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  arrival: Location;

  @Field()
  @IsNotEmpty()
  @IsDate()
  arrival_time: Date;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  transport: Transport;

  @Field(() => StatusEnum)
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
