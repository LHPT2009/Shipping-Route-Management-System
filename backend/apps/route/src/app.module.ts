import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//entities
import { Route } from './modules/routes/entity/route.entity';

//modules
import { RouteModule } from './modules/routes/route.module';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
// import { databaseConfig } from './config/database.config';
import { HealthModule } from './modules/health/health.module';
import { User } from './modules/routes/types/user.types';
import { UsersResolver } from './modules/routes/user.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username:  process.env.POSTGRES_USER,
      password:  process.env.POSTGRES_PASSWORD,
      entities: [Route],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      // plugins: [ApolloServerPluginInlineTrace()],
      buildSchemaOptions:{
        orphanedTypes: [User]
      }
    }),
    
    HealthModule,
    RouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(/*private dataSource: DataSource*/) {
    // console.log('dbName ', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    // consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
function ApolloServerPluginInlineTrace(): import("@apollo/server").ApolloServerPlugin<any> {
  throw new Error('Function not implemented.');
}

