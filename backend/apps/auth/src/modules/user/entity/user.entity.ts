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
  fullname: string;

  @Column()
  username: string;

  @Column()
  otp: string;

  @Column()
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

  @Column()
  verify_token: string;

  @Column({ type: 'timestamptz' })
  verify_token_expires: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  roles: RoleEntity;

  constructor(
    fullname: string,
    username: string,
    otp: string,
    email: string,
    phone_number: string,
    address: string,
    password: string,
    active: boolean,
    verify_token: string,
    verify_token_expires: Date,
    roles: RoleEntity
  ) {
    this.fullname = fullname;
    this.username = username;
    this.otp = otp;
    this.email = email;
    this.phone_number = phone_number;
    this.address = address;
    this.password = password;
    this.active = active;
    this.roles = roles;
    this.verify_token = verify_token;
    this.verify_token_expires = verify_token_expires;
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  // @BeforeInsert()
  // async hashVerifyToken() {
  //   const salt = await bcrypt.genSalt();
  //   this.verify_token = await bcrypt.hash(this.verify_token, salt);
  // }
}
