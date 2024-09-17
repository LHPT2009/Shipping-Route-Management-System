import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//entities
import { UserEntity } from './modules/user/entity/user.entity';

//modules
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RefreshTokenModule } from './modules/refreshtoken/refreshtoken.module';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HealthModule } from './modules/health/health.module';
import { RoleEntity } from './modules/role/entity/role.entity';
import { PermissionEntity } from './modules/permission/entity/permission.entity';
import { UserService } from './modules/user/user.service';
import { UserRepository } from './modules/user/user.repository';
import { EmailService } from './modules/email/email.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntity } from './modules/refreshtoken/entity/refreshtoken.entity';
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
      entities: [UserEntity, RoleEntity, PermissionEntity, RefreshTokenEntity],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req }) => ({ req }),
    }),

    HealthModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RefreshTokenModule,

    forwardRef(() => RoleModule),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),

    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AppController],
  providers: [AppService, UserService, UserRepository, EmailService, SeedService],
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
