import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { STATUS, STATUS_CODE } from 'common/constants/status';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
        exceptionFactory: (errors) => {
          const messages = errors.map((error) => {
            return {
              field: error.property,
              errors: Object.values(error.constraints),
            };
          });
          return new BadRequestException({
            statusCode: STATUS_CODE.FAILURE,
            message: STATUS.ERR_VALIDATION,
            errors: messages,
          });
        },
      }
    ),
  );
  app.enableCors();
  await app.listen(5020);
}
bootstrap();
