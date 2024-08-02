import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { StatusEnum } from '../interface/routes.interface';
import { Location } from '../../locations/type/location.type';
import { Transport } from '../../transports/type/transport.type';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
});

@ObjectType()
export class Route {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Location)
  departure: Location;

  @Field()
  departure_time: Date;

  @Field(() => Location)
  arrival: Location;

  @Field()
  arrival_time: Date;

  @Field(() => Number)
  distance: number;

  @Field(() => Transport)
  transport: Transport;

  @Field(() => StatusEnum)
  status: StatusEnum;
}
