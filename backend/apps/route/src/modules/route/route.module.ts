import { forwardRef, Module } from '@nestjs/common';
import { RoutesService } from './route.service';
import { RoutesResolver } from './route.resolver';
import { RouteRepository } from './route.repository';
import { TransportModule } from '../transport/transport.module';
import { LocationModule } from '../location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entity/routes.entity';

@Module({
  imports: [
    forwardRef(() => TransportModule),
    forwardRef(() => LocationModule),
    TypeOrmModule.forFeature([RouteEntity]),
  ],
  providers: [RoutesService, RoutesResolver, RouteRepository],
  exports: [RoutesService],
})
export class RouteModule {}
