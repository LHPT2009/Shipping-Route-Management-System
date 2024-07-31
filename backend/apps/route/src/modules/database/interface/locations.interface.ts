import { Route } from '../entities/routes.entity';

export default interface LocationInterface {
  id: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  departure: Route;
  arrival: Route;
}
