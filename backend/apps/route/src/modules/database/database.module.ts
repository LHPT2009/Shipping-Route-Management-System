import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/routes.entity';
import { Transport } from './entities/transports.entity';
import { Location } from './entities/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, Location, Transport])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
