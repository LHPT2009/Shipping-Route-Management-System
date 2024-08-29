import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//entities
import { RouteEntity } from './modules/route/entity/routes.entity';
import { LocationEntity } from './modules/location/entity/locations.entity';
import { TransportEntity } from './modules/transport/entity/transports.entity';

//modules
import { RouteModule } from './modules/route/route.module';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HealthModule } from './modules/health/health.module';
import { LocationModule } from './modules/location/location.module';
import { TransportModule } from './modules/transport/transport.module';
import { SeedService } from './seed/seed.service';

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
      context: ({ req }) => ({ req }),
    }),

    HealthModule,
    RouteModule,
    LocationModule,
    TransportModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule { }
