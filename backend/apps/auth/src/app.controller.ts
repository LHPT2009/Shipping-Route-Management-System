import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'; // Add this import
import { UserId, UserRole } from './protos/auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly kafkaProducerService: KafkaProducerService
  ) { }

  @Get()
  async getHello() {
    return true;
  }
  
  @GrpcMethod('UserService', 'GetUserRoleById')
  findOne(data: UserId, metadata: Metadata, call: ServerUnaryCall<any, any>): UserRole {
    const items = [
      { id: "1", role: 'admin', permissions: ["VIEW", "UPDATE"] },
      { id: "2", role: 'customer', permissions: ["VIEW"] },
    ];
    return items.find(({ id }) => id === data.id);
  }

}
