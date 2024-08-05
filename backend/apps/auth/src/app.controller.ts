import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
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

}
