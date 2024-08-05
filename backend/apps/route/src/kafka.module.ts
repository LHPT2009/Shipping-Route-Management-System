// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { KafkaConsumerService } from './kafka_consumer.service';
// import { kafkaConfig } from './config/kafka.config';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'KAFKA_SERVICE',
//         ...kafkaConfig,
//       },
//     ]),
//   ],
//   providers: [KafkaConsumerService],
//   exports: [KafkaConsumerService],
// })
// export class KafkaModule {}
