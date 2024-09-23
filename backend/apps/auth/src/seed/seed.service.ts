import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../modules/role/entity/role.entity';
import { PermissionEntity } from '../modules/permission/entity/permission.entity';
import { ROLE } from 'common/constants/role';
import { PERMISSION } from 'common/constants/permission';
import { UserEntity } from '../modules/user/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) { }

  async onApplicationBootstrap() {
    const roleRepository = this.dataSource.getRepository(RoleEntity);
    const permissionRepository = this.dataSource.getRepository(PermissionEntity);
    const userRepository = this.dataSource.getRepository(UserEntity);

    const permissionCount = await permissionRepository.count();
    if (permissionCount === 0) {
      await permissionRepository.save([
        { name: PERMISSION.READ_LIST_ROLE, description: PERMISSION.READ_LIST_ROLE_DESCRIPTION },
        { name: PERMISSION.READ_DETAIL_ROLE, description: PERMISSION.READ_DETAIL_ROLE_DESCRIPTION },
        { name: PERMISSION.CREATE_ROLE, description: PERMISSION.CREATE_ROLE_DESCRIPTION },
        { name: PERMISSION.UPDATE_ROLE, description: PERMISSION.UPDATE_ROLE_DESCRIPTION },
        { name: PERMISSION.DELETE_ROLE, description: PERMISSION.DELETE_ROLE_DESCRIPTION },

        { name: PERMISSION.READ_LIST_USER, description: PERMISSION.READ_LIST_USER_DESCRIPTION },
        { name: PERMISSION.READ_DETAIL_USER, description: PERMISSION.READ_DETAIL_USER_DESCRIPTION },
        { name: PERMISSION.CREATE_USER, description: PERMISSION.CREATE_USER_DESCRIPTION },
        { name: PERMISSION.UPDATE_USER, description: PERMISSION.UPDATE_USER_DESCRIPTION },
        { name: PERMISSION.DELETE_USER, description: PERMISSION.DELETE_USER_DESCRIPTION },

        { name: PERMISSION.READ_LIST_PERMISSION, description: PERMISSION.READ_LIST_PERMISSION_DESCRIPTION },
        { name: PERMISSION.READ_DETAIL_PERMISSION, description: PERMISSION.READ_DETAIL_PERMISSION_DESCRIPTION },
        { name: PERMISSION.CREATE_PERMISSION, description: PERMISSION.CREATE_PERMISSION_DESCRIPTION },
        { name: PERMISSION.UPDATE_PERMISSION, description: PERMISSION.UPDATE_PERMISSION_DESCRIPTION },
        { name: PERMISSION.DELETE_PERMISSION, description: PERMISSION.DELETE_PERMISSION_DESCRIPTION },

        { name: PERMISSION.READ_LIST_LOCATION, description: PERMISSION.READ_LIST_LOCATION_DESCRIPTION },
        { name: PERMISSION.READ_DETAIL_LOCATION, description: PERMISSION.READ_DETAIL_LOCATION_DESCRIPTION },
        { name: PERMISSION.CREATE_LOCATION, description: PERMISSION.CREATE_LOCATION_DESCRIPTION },
        { name: PERMISSION.UPDATE_LOCATION, description: PERMISSION.UPDATE_LOCATION_DESCRIPTION },
        { name: PERMISSION.DELETE_LOCATION, description: PERMISSION.DELETE_LOCATION_DESCRIPTION },

        { name: PERMISSION.READ_LIST_TRANSPORT, description: PERMISSION.READ_LIST_TRANSPORT_DESCRIPTION },
        { name: PERMISSION.READ_DETAIL_TRANSPORT, description: PERMISSION.READ_DETAIL_TRANSPORT_DESCRIPTION },
        { name: PERMISSION.CREATE_TRANSPORT, description: PERMISSION.CREATE_TRANSPORT_DESCRIPTION },
        { name: PERMISSION.UPDATE_TRANSPORT, description: PERMISSION.UPDATE_TRANSPORT_DESCRIPTION },
        { name: PERMISSION.DELETE_TRANSPORT, description: PERMISSION.DELETE_TRANSPORT_DESCRIPTION },

        { name: PERMISSION.READ_LIST_ROUTE, description: PERMISSION.READ_LIST_ROUTE_DESCRIPTION },
        { name: PERMISSION.READ_DETAIL_ROUTE, description: PERMISSION.READ_DETAIL_ROUTE_DESCRIPTION },
        { name: PERMISSION.CREATE_ROUTE, description: PERMISSION.CREATE_ROUTE_DESCRIPTION },
        { name: PERMISSION.UPDATE_ROUTE, description: PERMISSION.UPDATE_ROUTE_DESCRIPTION },
        { name: PERMISSION.DELETE_ROUTE, description: PERMISSION.DELETE_ROUTE_DESCRIPTION },

        { name: PERMISSION.ASSIGN_PERMISSION_TO_ROLE, description: PERMISSION.ASSIGN_PERMISSION_TO_ROLE_DESCRIPTION },
        { name: PERMISSION.ASSIGN_ROLE_TO_USER, description: PERMISSION.ASSIGN_ROLE_TO_USER_DESCRIPTION },
      ]);
    }

    const allPermissions = await permissionRepository.find();

    // Step 3: Seed Roles
    const roleCountafter = await roleRepository.count();
    if (roleCountafter === 0) {
      const readListRoute = allPermissions.find(permission => permission.name === PERMISSION.READ_LIST_ROUTE);
      const readDetailRoute = allPermissions.find(permission => permission.name === PERMISSION.READ_DETAIL_ROUTE);
      const readDetailUser = allPermissions.find(permission => permission.name === PERMISSION.READ_DETAIL_USER);

      await roleRepository.save([
        {
          name: ROLE.CUSTOMER,
          permissions: [readListRoute, readDetailRoute, readDetailUser],
        },
        {
          name: ROLE.ADMIN,
          permissions: allPermissions,
        },
      ]);
    }

    const userCount = await userRepository.count();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash("admin", salt);
    const passwordUser = await bcrypt.hash("aB123789#", salt);
    const verifyToken = crypto.randomBytes(32).toString('base64url');
    const verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);//24 hours
    if (userCount === 0) {

      const users = Array.from({ length: 100 }, (_, index = 0) => {
        const username = `user${index + 1}`;
        return {
          // id: (index + 1).toString(),
          fullname: `User ${index + 1}`,
          username: username,
          email: `${username}@example.com`,
          phone_number: `123456789${index}`,
          address: `Address ${index + 1}`,
          password: passwordUser,
          active: true,
          roles: { id: "1", name: ROLE.CUSTOMER }, // Assuming ROLE.USER corresponds to role id 1
          verify_token: verifyToken,
          verify_token_expires: verifyTokenExpires
        };
      });

      await userRepository.save([
        {
          fullname: "",
          username: "admin",
          email: "admin@gmail.com",
          phone_number: "",
          address: "",
          password: password,
          active: true,
          roles: { id: "2", name: ROLE.ADMIN },
          verify_token: verifyToken,
          verify_token_expires: verifyTokenExpires
        },
        ...users
      ]);
    }

  }
}