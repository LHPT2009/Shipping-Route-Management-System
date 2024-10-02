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
  shipping_type: string;

  @Field()
  distance: string;

  @Field()
  status: string;

  @Field()
  departureLongitude: number;

  @Field()
  departureLatitude: number;

  @Field()
  arrivalLongitude: number;

  @Field()
  arrivalLatitude: number;
}
