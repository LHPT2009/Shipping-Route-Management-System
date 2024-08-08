import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authContext } from './auth.context';
import { KafkaModule } from './kafka.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
              url: `${process.env.AUTH_URL}:5010/graphql`,
            },
            {
              name: 'route',
              url: `${process.env.ROUTE_URL}:5020/graphql`,
            },
            {
              name: 'notification',
              url: `${process.env.NOTIFICATION_URL}:5030/graphql`,
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
