import { Transport } from '../../transports/entity/transports.entity';
import { Location } from '../../locations/entity/locations.entity';

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
  transport: Transport;
  status: StatusEnum;
}
