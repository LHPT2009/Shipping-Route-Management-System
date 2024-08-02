import { forwardRef, Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsResolver } from './transports.resolver';
import { TransportRepository } from './transports.repository';
import { RoutesModule } from '../routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from './entity/transports.entity';

@Module({
  imports: [
    forwardRef(() => RoutesModule),
    TypeOrmModule.forFeature([Transport]),
  ],
  providers: [TransportsService, TransportsResolver, TransportRepository],
  exports: [TransportsService],
})
export class TransportsModule {}
