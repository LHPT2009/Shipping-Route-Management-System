import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './route.entity';
import LocationInterface from '../interface/location.interface';

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
