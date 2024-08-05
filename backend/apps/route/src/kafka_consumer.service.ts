// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { KafkaOptions, Transport, ClientKafka, MessagePattern } from '@nestjs/microservices';

// @Injectable()
// export class KafkaConsumerService implements OnModuleInit {
//   constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

//   async onModuleInit() {
//     await this.client.connect();
//   }

//   @MessagePattern('my_topic')
//   async handleMessage(data: any) {
//     console.log('Received data:', data);
//     // Handle the received data
//   }
// }
