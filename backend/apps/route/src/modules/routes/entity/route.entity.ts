import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';
import { Transport } from './transport.entity';
import RouteInterface, { StatusEnum } from '../interface/route.interface';

@Entity('routes')
export class Route implements RouteInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Location, (location) => location.departure)
  @JoinColumn({ name: "departure_id" })
  departure: Location;

  @Column()
  departure_time: Date;

  @ManyToOne(() => Location, (location) => location.arrival)
  @JoinColumn({ name: "arrival_id" })
  arrival: Location;

  @Column()
  arrival_time: Date;

  @Column()
  distance: number;

  @ManyToOne(() => Transport, (transport) => transport.route)
  @JoinColumn({ name: "transport_id" })
  transport: Transport;

  @Column({
    type: "enum",
    enum: StatusEnum,
  })
  status: StatusEnum;

}
