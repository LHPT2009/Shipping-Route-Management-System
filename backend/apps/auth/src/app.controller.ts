import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserId } from './protos/auth';
// import { KafkaProducerService } from './kafka_producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly kafkaProducerService: KafkaProducerService
  ) { }

  @Get()
  async getHello() {
    // try {
    //   await this.kafkaProducerService.emitMessage({ value: 'Hello Kafka' });
    // } catch (error) { console.log(error); }
    return true;
  }
  
  // @GrpcMethod('UserService', 'GetUserRoleById')
  // findOne(data: UserId, metadata: Metadata, call: ServerUnaryCall<any, any>): UserRole {
  //   const items = [
  //     { id: 1, role: 'admin', permissions: ["VIEW", "UPDATE"] },
  //     { id: 2, role: 'customer', permissions: ["VIEW"] },
  //   ];
  //   return items.find(({ id }) => id === data.id);
  // }

  @GrpcMethod('UserService', 'GetUserRoleById')
  getUserRoleById(data: UserId) {
    const items = [
      { id: 1, role: 'admin', permissions: ["VIEW", "UPDATE"] },
      { id: 2, role: 'customer', permissions: ["VIEW"] },
    ];
    return items.find(({ id }) => id === data.id);
  }

}
