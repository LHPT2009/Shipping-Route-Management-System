import { CreateRoutesDto } from "../dto/route-create.dto";

export const createRoutesDto: CreateRoutesDto = {
  name: 'Route 105',
  departure: {
    id: '1',
    name: 'Hoan Kiem Lake',
    address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
    longitude: 105.854444,
    latitude: 21.028511,
  },
  arrival: {
    id: '2',
    name: 'Ngoc Son Temple',
    address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
    longitude: 105.851111,
    latitude: 21.033333,
  },
  departure_time: new Date(),
  arrival_time: new Date(new Date().getTime() + 10000),
  transport: {
    id: '1',
    vehicle_type: 0,
    shipping_type: 0,
    name: 'Honda CBR',
    license_plate: 'ABC123'
  },
  distance: 100,
  status: 0,
};