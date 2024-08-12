import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entity/role.entity';
import UserInterface from '../interface/user.interface';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  active: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  roles: RoleEntity;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    address: string,
    password: string,
    active: boolean,
    roles: RoleEntity
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone_number = phone_number;
    this.address = address;
    this.password = password;
    this.active = active;
    this.roles = roles;
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
