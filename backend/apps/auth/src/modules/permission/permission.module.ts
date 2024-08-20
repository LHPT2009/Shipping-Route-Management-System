import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionResolver } from './permission.resolver';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    TypeOrmModule.forFeature([PermissionEntity]),
  ],
  providers: [PermissionService, PermissionResolver, PermissionRepository],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule { }
