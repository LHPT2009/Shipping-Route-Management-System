import { RouteEntity } from '../../route/entity/routes.entity';

export default interface LocationInterface {
  id: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  departure: RouteEntity;
  arrival: RouteEntity;
}
