import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../database/entities/routes.entity';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { MessageStore } from './messages.store';

@Injectable()
export class RoutesService {
  constructor(
    // @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly messageStore: MessageStore,
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) { }

  async findAll(): Promise<Route[]> {
    const data = await this.routeRepository.find();
    return data;
  }

  // async onModuleInit() {
  //   await this.kafkaClient.connect();
  //   this.kafkaClient.subscribeToResponseOf('routed_created');
  //   // this.kafkaClient.subscribeToResponseOf('topic2');
  // }

  // @MessagePattern('routed_created')
  // async handleTopic1Message(@Payload() message: any) {
  //   console.log('Received message from routed_created:', message);
  //   // Process the message
  //   this.messageStore.saveMessage('topic1', message.value);
  //   return message;
  // }

}
