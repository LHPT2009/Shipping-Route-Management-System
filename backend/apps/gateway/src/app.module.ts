import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authContext } from './auth.context';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import CustomFormatError from 'common/exception/validation/custom-format-error';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE_GRPC',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: ('./protos/auth.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: authContext,
        formatError: CustomFormatError,
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
            // {
            //   name: 'notification',
            //   url: `${process.env.NOTIFICATION_URL}:5030/graphql`,
            // },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('access_token', context.accessToken ? context.accessToken : null);
              request.http.headers.set('user_role', context.userRole ? JSON.stringify(context.userRole) : null);
            },
          });
        },
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
