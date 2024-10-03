import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionResolver } from './permission.resolver';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret'
    }),
    TypeOrmModule.forFeature([PermissionEntity]),
  ],
  providers: [PermissionService, PermissionResolver, PermissionRepository],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule { }
