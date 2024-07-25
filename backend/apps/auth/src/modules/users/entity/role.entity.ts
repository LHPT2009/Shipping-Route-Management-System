import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { PermissionRole } from './permission_role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  user: User;

  @OneToMany(() => PermissionRole, (permission_role) => permission_role.permission)
  permissionRole: PermissionRole[];

}
