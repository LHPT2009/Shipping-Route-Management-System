import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../../locations/entity/locations.entity';
import { TransportEntity } from '../../transports/entity/transports.entity';
import RouteInterface, { StatusEnum } from '../interface/routes.interface';

@Entity('routes')
export class Route implements RouteInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Location, (location) => location.departure, { eager: true })
  @JoinColumn({ name: 'departure_id' })
  departure: Location;

  @Column({ type: 'timestamptz' })
  departure_time: Date;

  @ManyToOne(() => Location, (location) => location.arrival, { eager: true })
  @JoinColumn({ name: 'arrival_id' })
  arrival: Location;

  @Column({ type: 'timestamptz' })
  arrival_time: Date;

  @Column()
  distance: number;

  @ManyToOne(() => TransportEntity, (transport) => transport.routes, { eager: true })
  @JoinColumn({ name: 'transport_id' })
  transport: TransportEntity;

  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;
}
