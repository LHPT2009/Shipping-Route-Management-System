// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { KafkaProducerService } from './kafka_producer.service';
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
//   providers: [KafkaProducerService],
//   exports: [KafkaProducerService],
// })
// export class KafkaModule {}
