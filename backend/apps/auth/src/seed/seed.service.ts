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
        { name: PERMISSION.GET },
        { name: PERMISSION.POST },
        { name: PERMISSION.PUT },
        { name: PERMISSION.PATCH },
        { name: PERMISSION.DELETE },
      ]);
    }

    const allPermissions = await permissionRepository.find();

    // Step 3: Seed Roles
    const roleCountafter = await roleRepository.count();
    if (roleCountafter === 0) {
      const getPermission = allPermissions.find(permission => permission.name === PERMISSION.GET);
      const postPermission = allPermissions.find(permission => permission.name === PERMISSION.POST);

      await roleRepository.save([
        {
          name: ROLE.CUSTOMER,
          permissions: [getPermission],
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