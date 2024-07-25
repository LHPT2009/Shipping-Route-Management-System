import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
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

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: "role_id" })
  role: Role;

}
