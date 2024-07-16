import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  ///123
  getHello(): string {
    return 'Notification service';
  }
}
