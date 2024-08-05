import { TransportEntity } from '../entities/transports.entity';
import { Location } from '../entities/locations.entity';

export enum StatusEnum {
  Progress,
  Finished,
  Cancelled,
}

export default interface RouteInterface {
  id: string;
  name: string;
  departure: Location;
  departure_time: Date;
  arrival: Location;
  arrival_time: Date;
  distance: number;
  transport: TransportEntity;
  status: StatusEnum;
}
