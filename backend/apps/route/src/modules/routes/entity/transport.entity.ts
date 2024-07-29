import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './route.entity';
import { ShippingTypeEnum, VehicleTypeEnum } from '../interface/transport.interface';

@Entity('transports')
export class Transport {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "enum",
    enum: VehicleTypeEnum,
  })
  vehicle_type: VehicleTypeEnum;

  @Column({
    type: "enum",
    enum: ShippingTypeEnum,
  })
  shipping_type: ShippingTypeEnum;

  @Column()
  name: string;

  @Column()
  license_plate: string;

  @OneToMany(() => Route, (route) => route.transport)
  route: Route;

}
