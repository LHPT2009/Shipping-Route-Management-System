import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { RoleEntity } from '../../role/entity/role.entity';
import UserInterface from '../interface/user.interface';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenEntity } from '../../refreshtoken/entity/refreshtoken.entity';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  username: string;

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

  @Column({ nullable: true })
  verify_token: string;

  @Column()
  img: string;

  @Column({ type: 'timestamptz', nullable: true })
  verify_token_expires: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  roles: RoleEntity;

  @OneToMany(() => RefreshTokenEntity, refreshToken => refreshToken.user)
  refreshTokens: RefreshTokenEntity[];

  constructor(
    username: string,
    email: string,
    password: string,
    verify_token: string,
    verify_token_expires: Date,
    roles: RoleEntity,
    active: boolean = false
  ) {
    this.username = username;
    this.email = email;
    this.active = active;
    this.password = password;
    this.verify_token = verify_token;
    this.verify_token_expires = verify_token_expires;
    this.roles = roles;

    this.fullname = '';
    this.phone_number = '';
    this.address = '';
    this.img = '';
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
