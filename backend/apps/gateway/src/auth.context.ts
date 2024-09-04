import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { STATUS } from 'common/constants/status';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';

export const authContext = async ({ req }) => {

  let accessToken: string = req.headers.authorization;

  if (accessToken && accessToken.startsWith('Bearer ')) {
    accessToken = accessToken.split(' ')[1];
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
        accessToken: accessToken,
        userRole: data,
      };
    } catch (err) {
      throw new CustomValidationError(STATUS.ERR_VALIDATION, { token: ['Token is Invaild.'] });
    }
  }

};
