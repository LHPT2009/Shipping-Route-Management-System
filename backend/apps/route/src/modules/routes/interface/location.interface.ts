import { Route } from "../entity/route.entity";

export default interface LocationInterface {
    id: string,
    name: string, 
    address: string, 
    longitude: number,
    latitude: number
    departure: Route;
    arrival: Route;
}