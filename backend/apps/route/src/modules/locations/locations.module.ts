import { forwardRef, Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { LocationRepository } from './locations.repository';
import { RoutesModule } from '../routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entity/locations.entity';

@Module({
  imports: [
    forwardRef(() => RoutesModule),
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [LocationsService, LocationsResolver, LocationRepository],
  exports: [LocationsService],
})
export class LocationsModule {}
