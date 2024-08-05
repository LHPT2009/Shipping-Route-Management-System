import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/routes.entity';
import { TransportEntity } from './entities/transports.entity';
import { Location } from './entities/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, Location, TransportEntity])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
