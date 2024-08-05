import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Field, InputType, ID } from '@nestjs/graphql';
import { StatusEnum } from '../interface/routes.interface';
import { Location } from '../../locations/type/location.type';
import { Transport } from '../../transports/type/transport.type';

@InputType()
export class UpdateRoutesDto {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsString()
  departure?: Location;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  departure_time?: Date;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsString()
  arrival?: Location;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  arrival_time?: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsNumber()
  distance?: number;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsString()
  transport?: Transport;

  @Field(() => StatusEnum, { nullable: true })
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
