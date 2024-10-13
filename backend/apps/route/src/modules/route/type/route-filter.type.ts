import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { StatusEnum } from '../interface/routes.interface';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
});

@ObjectType()
export class FilterRouteType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  departure: string;

  @Field()
  arrival: string;

  @Field()
  departure_time: string;

  @Field()
  arrival_time: string;

  @Field()
  shipping_type: string;

  @Field()
  vehicle_type: string;

  @Field()
  license_plate: string;

  @Field()
  distance: string;

  @Field()
  status: string;

  @Field()
  departure_longitude: number;

  @Field()
  departure_latitude: number;

  @Field()
  arrival_longitude: number;

  @Field()
  arrival_latitude: number;

}
