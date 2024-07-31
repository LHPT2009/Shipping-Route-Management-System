import LocationInterface from '../interface/locations.interface';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RouteType } from './routes.type';

@ObjectType()
export class LocationType implements LocationInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  longitude: number;

  @Field()
  latitude: number;

  @Field(() => RouteType)
  departure: RouteType;

  @Field(() => RouteType)
  arrival: RouteType;
}
