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

  checkForDuplicatePairs = (data) => {
    const pairs = new Set();
    const duplicatePairs = new Set();
  
    data.forEach(route => {
      const pair = `${route.departure.id}-${route.arrival.id}`;
      
      if (pairs.has(pair)) {
        duplicatePairs.add(pair);
      } else {
        pairs.add(pair);
      }
    });
  
    return Array.from(duplicatePairs);
  };

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

    const duplicatePairs = this.checkForDuplicatePairs(routeData);

    if (duplicatePairs.length > 0) {
      console.log('Duplicate departure-arrival pairs found:', duplicatePairs);
    } else {
      console.log('No duplicate departure-arrival pairs found.');
    }
    if (routeCount === 0) {
      await routeRepository.save(routeData);
    }

    // const allRoutes = await routeRepository.find();
    // console.log(allRoutes.length);

  }
}