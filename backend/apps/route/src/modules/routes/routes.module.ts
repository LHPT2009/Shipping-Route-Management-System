import { forwardRef, Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesResolver } from './routes.resolver';
import { RouteRepository } from './routes.repository';
import { TransportsModule } from '../transports/transports.module';
import { LocationsModule } from '../locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entity/routes.entity';

@Module({
  imports: [
    forwardRef(() => TransportsModule),
    forwardRef(() => LocationsModule),
    TypeOrmModule.forFeature([Route]),
  ],
  providers: [RoutesService, RoutesResolver, RouteRepository],
  exports: [RoutesService],
})
export class RoutesModule {}
