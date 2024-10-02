import { forwardRef, Module } from '@nestjs/common';
import { LocationsService } from './location.service';
import { LocationsResolver } from './location.resolver';
import { LocationRepository } from './location.repository';
import { RouteModule } from '../route/route.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entity/locations.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => RouteModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([LocationEntity]),
  ],
  providers: [LocationsService, LocationsResolver, LocationRepository],
  exports: [LocationsService, LocationRepository],
})
export class LocationModule {}
