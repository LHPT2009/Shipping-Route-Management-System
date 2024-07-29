
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import PermissionInterface from '../interface/permission.interface';
import RoleInterface from '../interface/role.interface';

@Entity('permissions')
export class Permission implements PermissionInterface{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Role, (role) => role.permission)
  @JoinTable({
    name: "permissions_roles",
    joinColumn: {
      name: "permission_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    }
  })
  role: Role[];
}
