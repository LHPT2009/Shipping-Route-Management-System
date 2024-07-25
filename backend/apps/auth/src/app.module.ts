import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//entities
import { User } from './modules/users/entity/user.entity';

//modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';


//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { databaseConfig } from './config/database.config';
import { HealthModule } from './modules/health/health.module';
import { Role } from './modules/users/entity/role.entity';
import { Permission } from './modules/users/entity/permission.entity';
import { PermissionRole } from './modules/users/entity/permission_role.entity';
import { Page } from './modules/users/entity/page.entity';

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
      entities: [User, Role, Permission, PermissionRole, Page],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      // plugins: [ApolloServerPluginInlineTrace()],

    }),
    
    HealthModule,
    AuthModule,
    UsersModule,
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

