import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsResolver } from './transports.resolver';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TransportsService, TransportsResolver],
  exports: [TransportsService],
})
export class TransportsModule {}
