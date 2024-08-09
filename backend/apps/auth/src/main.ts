import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
// import auth from "../../../dist/apps/auth/protos/auth";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: ('./protos/auth.proto'),
      url: 'localhost:50051',
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(5010);
}
bootstrap();

