import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from '../../routes/entity/routes.entity';
import {
  ShippingTypeEnum,
  TransportInterface,
  VehicleTypeEnum,
} from '../interface/transports.interface';

@Entity('transports')
export class Transport implements TransportInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: VehicleTypeEnum,
  })
  vehicleType: VehicleTypeEnum;

  @Column({
    type: 'enum',
    enum: ShippingTypeEnum,
  })
  shippingType: ShippingTypeEnum;

  @Column()
  name: string;

  @Column()
  license_plate: string;

  @OneToMany(() => Route, (route) => route.transport)
  routes: Route;
}
