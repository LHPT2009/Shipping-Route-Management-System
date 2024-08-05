import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';
import { ClientKafka } from '@nestjs/microservices';
// import { KafkaProducerService } from './kafka_producer.service';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  // ) { }

  // getHello() {
  //   try {
  //     this.kafkaClient.emit(
  //       'route_created',
  //       'test from auth',
  //     )
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // constructor( 
  //   private readonly client: KafkaProducerService
  // ) {}

  // async onModuleInit() {
  //   // Subscribe to topics
  //   this.client.subscribeToResponseOf('route_created');
  //   await this.client.connect();
  //   console.log('Connected to Kafka App service');
  // }

  // async emitMessage(data: any) {
  //   await this.client.emit('route_created', data);
  // }
}
