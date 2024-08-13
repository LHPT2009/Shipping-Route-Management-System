import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ///123
  getHello(): string {
    return 'Notification service';
  }
}
