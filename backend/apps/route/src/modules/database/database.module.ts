import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from '../routes/entity/routes.entity';
import { TransportEntity } from '../transports/entity/transports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, Location, TransportEntity])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
