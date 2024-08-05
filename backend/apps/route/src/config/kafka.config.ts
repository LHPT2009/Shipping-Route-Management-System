import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: '123',
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: 'test',
    },
  },
};
