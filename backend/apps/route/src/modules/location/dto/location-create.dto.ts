import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLocationDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}
