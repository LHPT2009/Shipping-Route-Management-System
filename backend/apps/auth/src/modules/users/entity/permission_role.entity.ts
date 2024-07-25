
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { Page } from './page.entity';

@Entity('permissions_roles')
export class PermissionRole {
  @PrimaryGeneratedColumn()
  role_id: string;

  @PrimaryGeneratedColumn()
  permission_id: string;

  @ManyToOne(() => Permission, (permission) => permission.permissionRole)
  @JoinColumn({ name: "role_id" })
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.permissionRole)
  @JoinColumn({ name: "permission_id" })
  role: Role;

  @ManyToOne(() => Page, (page) => page.permissionRole)
  @JoinColumn({ name: "page_id" })
  page: Page;

}
