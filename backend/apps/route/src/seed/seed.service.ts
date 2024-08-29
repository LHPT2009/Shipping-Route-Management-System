import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LocationEntity } from '../modules/location/entity/locations.entity';
import { TransportEntity } from '../modules/transport/entity/transports.entity';
import { RouteEntity } from '../modules/route/entity/routes.entity';
import { locationData } from './data/location-data';
import { transportData } from './data/transport-data';
import { routeData } from './data/route-data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) { }

  async onApplicationBootstrap() {
    const locationRepository = this.dataSource.getRepository(LocationEntity);
    const transportRepository = this.dataSource.getRepository(TransportEntity);
    const routeRepository = this.dataSource.getRepository(RouteEntity);

    const locationCount = await locationRepository.count();
    if (locationCount === 0) {
      await locationRepository.save(locationData);
    }

    const transportCount = await transportRepository.count();
    if (transportCount === 0) {
      await transportRepository.save(transportData);
    }

    const routeCount = await routeRepository.count();
    if (routeCount === 0) {
      await routeRepository.save(routeData);
    }

    // const allRoutes = await routeRepository.find();
    // console.log(allRoutes.length);

  }
}