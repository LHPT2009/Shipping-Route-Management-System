export enum StatusEnum {
  Progress,
  Finished,
  Cancelled,
}

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

export interface RouteInterface {
  id: number;
  name: string;
  departure_time: string;
  arrival_time: string;
  distance: string;
  status: StatusEnum;
  departure : {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  }
  arrival : {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  }
  transport : {
    id: number;
    vehicle_type: VehicleTypeEnum;
    shipping_type: ShippingTypeEnum;
    name: string;
    license_plate: string;
  }
};
