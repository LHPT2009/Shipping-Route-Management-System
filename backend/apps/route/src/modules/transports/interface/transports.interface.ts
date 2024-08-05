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
  vehicleType: VehicleTypeEnum;
  shippingType: ShippingTypeEnum;
  name: string;
  license_plate: string;
}
