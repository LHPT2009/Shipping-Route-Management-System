// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';

// @Injectable()
// export class KafkaProducerService implements OnModuleInit {
//   constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

//   async onModuleInit() {
//     // Subscribe to topics
//     this.client.subscribeToResponseOf('my_topic');
//     console.log('Connected to Kafka Producer');
//     await this.client.connect();
//   }

//   async emitMessage(data: any) {
//     await this.client.emit('my_topic', data);
//   }
// }
