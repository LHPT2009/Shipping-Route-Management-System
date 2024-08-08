import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entity/role.entity';
import PermissionInterface from '../interface/permission.interface';

@Entity('permissions')
export class PermissionEntity implements PermissionInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable({
    name: 'permissions_roles',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
