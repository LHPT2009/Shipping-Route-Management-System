import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authContext } from './auth.context';
import { KafkaModule } from './kafka.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


@Module({
  imports: [
    KafkaModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: authContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'auth',
              url: 'http://auth_service:5010/graphql',
            },
            {
              name: 'route',
              url: 'http://route_service:5020/graphql',
            },
            {
              name: 'notification',
              url: 'http://notification_service:5030/graphql',
            },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'accessToken',
                context.accessToken ? context.accessToken : null,
              );
            },
          });
        },
      },
    }),
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'auth',
    //       protoPath: join(__dirname, 'protos/auth.proto'),
    //     },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
