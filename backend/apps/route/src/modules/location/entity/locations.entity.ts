import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RouteEntity } from '../../route/entity/routes.entity';
import LocationInterface from '../interface/locations.interface';

@Entity('locations')
export class LocationEntity implements LocationInterface {
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

  @OneToMany(() => RouteEntity, (route) => route.departure)
  departure: RouteEntity;

  @OneToMany(() => RouteEntity, (route) => route.arrival)
  arrival: RouteEntity;
}
