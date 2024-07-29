import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import RoleInterface from '../interface/role.interface';

@Entity('roles')
export class Role implements RoleInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  user: User;

  @ManyToMany(() => Permission, (permission) => permission.role)
  @JoinTable({
    name: "permissions_roles",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id"
    }
  })
  permission: Permission[];

}
