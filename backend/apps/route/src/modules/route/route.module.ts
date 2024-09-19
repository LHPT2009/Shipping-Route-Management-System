import { forwardRef, Module } from '@nestjs/common';
import { RoutesService } from './route.service';
import { RoutesResolver } from './route.resolver';
import { RouteRepository } from './route.repository';
import { TransportModule } from '../transport/transport.module';
import { LocationModule } from '../location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entity/routes.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocationRepository } from '../location/location.repository';

@Module({
  imports: [
    forwardRef(() => TransportModule),
    forwardRef(() => LocationModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([RouteEntity]),
  ],
  providers: [RoutesService, RoutesResolver, RouteRepository],
  exports: [RoutesService],
})
export class RouteModule {}
