import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'; // Add this import
import { UserId, UserRole } from './protos/auth';
import { UserService } from './modules/user/user.service';
import { UserEntity } from './modules/user/entity/user.entity';
import { ResponseDto } from 'common/response/responseDto';
import { instanceToPlain } from 'class-transformer';
import { RoleService } from './modules/role/role.service';
import { Any } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private roleService: RoleService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('UserService', 'GetUserRoleById')
  async findOne(data: UserId, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserRole> {

    const getUserInfo = instanceToPlain(await this.userService.findInfoByID(data.id));

    const getPermission = instanceToPlain(await this.roleService.findOne(getUserInfo.data.roles.id));

    const result: UserRole = {
      id: getUserInfo.data.id,
      role: getUserInfo.data.roles.name,
      permissions: getPermission.data.permissions.map((item:any) => item.name),
    };

    return result;
  }

}
