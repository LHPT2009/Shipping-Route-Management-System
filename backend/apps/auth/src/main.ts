import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { STATUS, STATUS_CODE } from 'common/constants/status';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: './protos/auth.proto',
      url: 'localhost:50051',
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          return {
            field: error.property,
            errors: Object.values(error.constraints),
          };
        });
        return new BadRequestException({
          statusCode: STATUS_CODE.FAILURE,
          message: STATUS.VALIDATION_ERROR,
          errors: messages,
        });
      },
    }),
  );
  app.enableCors();
  await app.listen(5010);
}
bootstrap();
