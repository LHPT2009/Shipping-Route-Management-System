import { forwardRef, Module } from '@nestjs/common';
import { TransportsService } from './transport.service';
import { TransportsResolver } from './transport.resolver';
import { TransportRepository } from './transport.repository';
import { RouteModule } from '../route/route.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportEntity } from './entity/transports.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => RouteModule),
    TypeOrmModule.forFeature([TransportEntity]),
  ],
  providers: [TransportsService, TransportsResolver, TransportRepository, JwtService],
  exports: [TransportsService],
})
export class TransportModule { }
