import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './routes.entity';
import {
  ShippingTypeEnum,
  TransportInterface,
  VehicleTypeEnum,
} from '../interface/transports.interface';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(VehicleTypeEnum, {
  name: 'VehicleTypeEnum',
});

registerEnumType(ShippingTypeEnum, {
  name: 'ShippingTypeEnum',
});

@ObjectType()
@Entity('transports')
export class Transport implements TransportInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => VehicleTypeEnum)
  @Column({
    type: 'enum',
    enum: VehicleTypeEnum,
  })
  vehicleType: VehicleTypeEnum;

  @Field(() => ShippingTypeEnum)
  @Column({
    type: 'enum',
    enum: ShippingTypeEnum,
  })
  shippingType: ShippingTypeEnum;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  license_plate: string;

  @Field(() => Route, { nullable: true })
  @OneToMany(() => Route, (route) => route.transport)
  routes: Route;
}
