import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import {
  ShippingTypeEnum,
  VehicleTypeEnum,
} from '../interface/transports.interface';

@InputType()
export class UpdateTransportDto {
  @Field(() => VehicleTypeEnum)
  @IsNotEmpty()
  @IsEnum(VehicleTypeEnum)
  vehicleType?: VehicleTypeEnum;

  @Field(() => ShippingTypeEnum)
  @IsNotEmpty()
  @IsEnum(ShippingTypeEnum)
  shippingType?: ShippingTypeEnum;

  @Field()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  license_plate?: string;
}
