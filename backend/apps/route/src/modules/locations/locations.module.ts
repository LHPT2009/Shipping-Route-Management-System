import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LocationsService, LocationsResolver],
  exports: [LocationsService],
})
export class LocationsModule {}
