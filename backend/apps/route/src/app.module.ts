import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//entities

//modules
import { RoutesModule } from './modules/routes/routes.module';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HealthModule } from './modules/health/health.module';
import { LocationsModule } from './modules/locations/locations.module';
import { TransportsModule } from './modules/transports/transports.module';
import { DatabaseModule } from './modules/database/database.module';
// import { KafkaConsumerService } from './kafka_consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Route } from './modules/routes/entity/routes.entity';
import { TransportEntity } from './modules/transports/entity/transports.entity';
import { Location } from './modules/locations/entity/locations.entity';

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
      entities: [Route, Location, TransportEntity],
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
    }),

    HealthModule,
    RoutesModule,
    LocationsModule,
    TransportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {}
}
