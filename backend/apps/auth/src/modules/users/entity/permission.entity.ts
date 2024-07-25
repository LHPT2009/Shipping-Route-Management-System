
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { PermissionRole } from './permission_role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PermissionRole, (permission_role) => permission_role.permission)
  permissionRole: PermissionRole[];
}
