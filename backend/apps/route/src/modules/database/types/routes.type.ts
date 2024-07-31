import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import RouteInterface, { StatusEnum } from '../interface/routes.interface';
import { LocationType } from './locations.type';
import { TransportType } from './transports.type';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
});

@ObjectType()
export class RouteType implements RouteInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => LocationType)
  departure: LocationType;

  @Field()
  departure_time: Date;

  @Field(() => LocationType)
  arrival: LocationType;

  @Field()
  arrival_time: Date;

  @Field(() => Number)
  distance: number;

  @Field(() => TransportType)
  transport: TransportType;

  @Field(() => StatusEnum)
  status: StatusEnum;
}
