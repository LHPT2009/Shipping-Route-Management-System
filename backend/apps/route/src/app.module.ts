import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//entities
import { RouteEntity } from './modules/route/entity/routes.entity';
import { LocationEntity } from './modules/location/entity/locations.entity';
import { TransportEntity } from './modules/transport/entity/transports.entity';

//modules
import { RouteModule } from './modules/route/route.module';

//graphql
import { GraphQLError } from 'graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HealthModule } from './modules/health/health.module';
import { LocationModule } from './modules/location/location.module';
import { TransportModule } from './modules/transport/transport.module';
import { ResponseErrorDto } from './common/dto/responseError.dto';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [RouteEntity, LocationEntity, TransportEntity],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        // orphanedTypes: [User],
      },
      // formatError: (error: GraphQLError) => {
      //   const originalError = error.extensions?.exception as {
      //     response?: { statusCode: number; message: string[]; error: string };
      //   };

      //   const responseError = new ResponseErrorDto();

      //   if (
      //     originalError?.response?.statusCode === 400 &&
      //     Array.isArray(originalError.response.message)
      //   ) {
      //     // Format validation error messages
      //     const formattedMessages = originalError.response.message
      //       .map((msg) => {
      //         // Customize how you want to format the message here if needed
      //         return msg;
      //       })
      //       .join(', ');

      //     responseError.setStatus(originalError.response.statusCode);
      //     responseError.setMessage(formattedMessages);
      //     responseError.setError(
      //       originalError.response.error || 'Validation Error',
      //     );
      //   } else {
      //     responseError.setStatus(500); // Default status code if not provided
      //     responseError.setMessage(`${error.name} - ${error.message}`);
      //     responseError.setError('Internal Server Error');
      //   }

      //   return responseError;
      // },
    }),

    HealthModule,
    RouteModule,
    LocationModule,
    TransportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {}
}
