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
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntity } from './modules/refreshtoken/entity/refreshtoken.entity';
import { SeedService } from './seed/seed.service';
import { KafkaModule } from './modules/kafka/kafka.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { dataSourceOptions } from 'db/data-source';
import { ContactModule } from './modules/contact/contact.module';
import { ContactEntity } from './modules/contact/entity/contact.entity';
import { OpenaiModule } from './modules/openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req }) => ({ req }),
    }),

    TypeOrmModule.forRoot(
      {
        ...dataSourceOptions,
        entities: [UserEntity, RoleEntity, PermissionEntity, RefreshTokenEntity, ContactEntity]
      }
    ),

    HealthModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RefreshTokenModule,
    KafkaModule,
    ContactModule,
    OpenaiModule,

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
  providers: [AppService, UserService, UserRepository, SeedService],
})
export class AppModule implements NestModule {
  configure() {
  }
}
