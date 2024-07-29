import { Transport } from "../entity/transport.entity";
import { Location } from "../entity/location.entity";

export enum StatusEnum {
    Progress,
    Finished,
    Cancelled
}

export default interface RouteInterface {
    id: string;
    name: string;
    departure: Location;
    departure_time: Date;
    arrival: Location;
    arrival_time: Date;
    distance: number,
    transport: Transport;
    status: StatusEnum;
}