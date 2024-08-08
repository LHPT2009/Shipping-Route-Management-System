import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @GrpcMethod('UserService', 'GetUserRoleById')
  // findOne(data: UserId, metadata: Metadata, call: ServerUnaryCall<any, any>): UserRole {
  //   const items = [
  //     { id: 1, role: 'admin', permissions: ["VIEW", "UPDATE"] },
  //     { id: 2, role: 'customer', permissions: ["VIEW"] },
  //   ];
  //   return items.find(({ id }) => id === data.id);
  // }
}
