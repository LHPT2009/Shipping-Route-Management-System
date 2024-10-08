import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserId, UserRole } from './protos/auth';
import { UserService } from './modules/user/user.service';
import { instanceToPlain } from 'class-transformer';
import { RoleService } from './modules/role/role.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private roleService: RoleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('UserService', 'GetUserRoleById')
  async findOne(data: UserId, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserRole> {

    const userFromRedis: UserRole | null = await this.cacheManager.get(data.id);
    if (userFromRedis !== null) {
      console.log("User in redis: ", userFromRedis);
      return userFromRedis;

    } else {
      console.log("User not in redis: ", userFromRedis);
      const getUserInfo = instanceToPlain(await this.userService.findInfoByID(data.id));
      const getPermission = instanceToPlain(await this.roleService.findOne(getUserInfo.data.roles.id));

      const result: UserRole = {
        id: getUserInfo.data.id,
        role: getUserInfo.data.roles.name,
        permissions: getPermission.data.permissions.map((item: any) => item.name),
      };

      await this.cacheManager.set(data.id, result);

      return result;
    }

  }

}
