import { UnauthorizedException } from '@nestjs/common';
import { access } from 'fs';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { lastValueFrom } from 'rxjs';

export const authContext = async ({ req }) => {

  const accessToken: string = req.headers.accesstoken;

  if (accessToken === undefined) {
    console.log('No access token');
  }
  else {
    const jwtService = new JwtService();

    const decoded = jwtService.decode(accessToken);

    const client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: ('./protos/auth.proto'),
        url: 'localhost:50051',
      },
    });

    const appService = new AppService(client);

    try {
      const data = await lastValueFrom(appService.getUserRoleById(decoded.userId));
      return {
        accessToken: req.headers.accesstoken,
        userRole: data,
      };
    } catch (err) {
      throw err;
    }
  }
};
