import { ShippingTypeEnum, VehicleTypeEnum } from '../../interface/transports.interface';
import { Transport } from '../../type/transport.type';

export const listTransports: Transport[] = [
  {
    id: '1',
    vehicle_type: VehicleTypeEnum.Motorbike,
    shipping_type: ShippingTypeEnum.Road,
    name: 'Truck A',
    license_plate: 'ABC-1234',
  },
  {
    id: '2',
    vehicle_type: VehicleTypeEnum.Ship,
    shipping_type: ShippingTypeEnum.Seaway,
    name: 'Ship B',
    license_plate: 'XYZ-5678',
  },
];