export enum VehicleTypeEnum {
  Motorbike,
  Tricycle,
  Truck,
  Ship,
  Ferry,
}

export enum ShippingTypeEnum {
  Road,
  Seaway,
}

export interface TransportInterface {
  id: string;
  vehicle_type: VehicleTypeEnum;
  shipping_type: ShippingTypeEnum;
  name: string;
  license_plate: string;
}
