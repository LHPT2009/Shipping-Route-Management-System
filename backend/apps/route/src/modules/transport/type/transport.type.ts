import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  VehicleTypeEnum,
  ShippingTypeEnum,
} from '../interface/transports.interface';

registerEnumType(VehicleTypeEnum, {
  name: 'VehicleTypeEnum',
});

registerEnumType(ShippingTypeEnum, {
  name: 'ShippingTypeEnum',
});

@ObjectType()
export class Transport {
  @Field(() => ID)
  id: string;

  @Field(() => VehicleTypeEnum)
  vehicleType: VehicleTypeEnum;

  @Field(() => ShippingTypeEnum)
  shippingType: ShippingTypeEnum;

  @Field()
  name: string;

  @Field()
  license_plate: string;
}
