import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  VehicleTypeEnum,
  ShippingTypeEnum,
  TransportInterface,
} from '../interface/transports.interface';
import { RouteType } from './routes.type';

registerEnumType(VehicleTypeEnum, {
  name: 'VehicleTypeEnum',
});

registerEnumType(ShippingTypeEnum, {
  name: 'ShippingTypeEnum',
});

@ObjectType()
export class TransportType implements TransportInterface {
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

  @Field(() => RouteType, { nullable: true })
  routes: RouteType;
}
