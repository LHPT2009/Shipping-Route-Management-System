import { TransportEntity } from '../../transport/entity/transports.entity';
import { LocationEntity } from '../../location/entity/locations.entity';

export enum StatusEnum {
  Progress,
  Finished,
  Cancelled,
}

export default interface RouteInterface {
  id: string;
  name: string;
  departure: LocationEntity;
  departure_time: Date;
  arrival: LocationEntity;
  arrival_time: Date;
  distance: number;
  transport: TransportEntity;
  status: StatusEnum;
}
