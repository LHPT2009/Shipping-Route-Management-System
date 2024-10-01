import { UpdateRoutesDto } from "../dto/route-update.dto";

export const updateRoutesDto: UpdateRoutesDto = {
  name: 'Route 1',
  departure: {
    id: '1',
    name: 'Hoan Kiem Lake',
    address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
    longitude: 15.854444,
    latitude: 21.028511,
  },
  arrival: {
    id: '2',
    name: 'Ngoc Son Temple',
    address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
    longitude: 15.851111,
    latitude: 21.033333,
  },
  departure_time: new Date(),
  arrival_time: new Date(new Date().getTime() + 1000),
  transport: {
    id: '1',
    vehicle_type: 0,
    shipping_type: 0,
    name: 'Honda CBR',
    license_plate: 'ABC123'
  },
  distance: 10,
  status: 0,
};