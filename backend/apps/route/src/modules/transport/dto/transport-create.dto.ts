import { IsNotEmpty, IsString, IsEnum, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import {
  ShippingTypeEnum,
  VehicleTypeEnum,
} from '../interface/transports.interface';

@InputType()
export class CreateTransportDto {
  @Field(() => VehicleTypeEnum)
  @IsNotEmpty({ message: 'Vehicle type is required' })
  @IsEnum(VehicleTypeEnum, {
    message: 'Vehicle type must be a valid enum value',
  })
  vehicleType: VehicleTypeEnum;

  @Field(() => ShippingTypeEnum)
  @IsNotEmpty({ message: 'Shipping type is required' })
  @IsEnum(ShippingTypeEnum, {
    message: 'Shipping type must be a valid enum value',
  })
  shippingType: ShippingTypeEnum;

  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Min Length is 3' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'License plate is required' })
  @IsString({ message: 'License plate must be a string' })
  license_plate: string;
}
