import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from '../../location/entity/locations.entity';
import { TransportEntity } from '../../transport/entity/transports.entity';
import RouteInterface, { StatusEnum } from '../interface/routes.interface';

@Entity('routes')
export class RouteEntity implements RouteInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => LocationEntity, (location) => location.departure, {
    eager: true,
  })
  @JoinColumn({ name: 'departure_id' })
  departure: LocationEntity;

  @Column({ type: 'timestamptz' })
  departure_time: Date;

  @ManyToOne(() => LocationEntity, (location) => location.arrival, {
    eager: true,
  })
  @JoinColumn({ name: 'arrival_id' })
  arrival: LocationEntity;

  @Column({ type: 'timestamptz' })
  arrival_time: Date;

  @Column()
  distance: number;

  @ManyToOne(() => TransportEntity, (transport) => transport.routes, {
    eager: true,
  })
  @JoinColumn({ name: 'transport_id' })
  transport: TransportEntity;

  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;
}
