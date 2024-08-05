import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './locations.entity';
import { TransportEntity } from './transports.entity';
import RouteInterface, { StatusEnum } from '../interface/routes.interface';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
});

@ObjectType()
@Entity('routes')
export class Route implements RouteInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Location)
  @ManyToOne(() => Location, (location) => location.departure, { eager: true })
  @JoinColumn({ name: 'departure_id' })
  departure: Location;

  @Field()
  @Column({ type: 'timestamptz' })
  departure_time: Date;

  @Field(() => Location)
  @ManyToOne(() => Location, (location) => location.arrival, { eager: true })
  @JoinColumn({ name: 'arrival_id' })
  arrival: Location;

  @Field()
  @Column({ type: 'timestamptz' })
  arrival_time: Date;

  @Field(() => Number)
  @Column()
  distance: number;

  @Field(() => TransportEntity)
  @ManyToOne(() => TransportEntity, (transport) => transport.routes, { eager: true })
  @JoinColumn({ name: 'transport_id' })
  transport: TransportEntity;

  @Field(() => StatusEnum)
  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;
}
