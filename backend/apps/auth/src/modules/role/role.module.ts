import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleRepository } from './role.repository';
import { UserModule } from '../user/user.module';
import { PermissionModule } from '../permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => PermissionModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  providers: [RoleService, RoleResolver, RoleRepository, JwtService],
  exports: [RoleService],
})
export class RoleModule { }
