import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from '../../routes/entity/routes.entity';
import LocationInterface from '../interface/locations.interface';

@Entity('locations')
export class Location implements LocationInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @OneToMany(() => Route, (route) => route.departure)
  departure: Route;

  @OneToMany(() => Route, (route) => route.arrival)
  arrival: Route;
}
