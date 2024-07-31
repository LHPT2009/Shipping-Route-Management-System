import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './routes.entity';
import LocationInterface from '../interface/locations.interface';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('locations')
export class Location implements LocationInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  longitude: number;

  @Field()
  @Column()
  latitude: number;

  @Field(() => Route)
  @OneToMany(() => Route, (route) => route.departure)
  departure: Route;

  @Field(() => Route)
  @OneToMany(() => Route, (route) => route.arrival)
  arrival: Route;
}
