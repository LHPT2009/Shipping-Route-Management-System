import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { access } from 'fs';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const authContext = async ({ req }) => {

  // console.log(req.headers.accesstoken);
  const client = ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: ('./protos/auth.proto'),
      url: 'localhost:50051',
    },
  });

  const appService = new AppService(client as any);

  appService.getUserRoleById("2").subscribe({
    next: (data) => {
      console.log('data', data);
    },
    error: (err) => {
      console.error('error', err);
    },
    complete: () => {
      console.log('Completed');
    },
  });

  return {
    accessToken: req.headers.accesstoken,
  };

};
