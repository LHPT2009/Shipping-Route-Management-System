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
  }

  checkForDuplicateNames(data) {
    const seenNames = new Set();
    const duplicates = [];

    data.forEach(location => {
      if (seenNames.has(location.name)) {
        duplicates.push(location.name);
      } else {
        seenNames.add(location.name);
      }
    });

    return duplicates;
  }

  findLocationById(id: string) {
    return locationData.find(location => location.id.toString() === id);
  }

  haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 

    return parseFloat(distance.toFixed(2));
  }

  calculateRouteDistances(routes) {
    return routes.map((route, index) => {
      const departureLocation = this.findLocationById(route.departure.id);
      const arrivalLocation = this.findLocationById(route.arrival.id);
      if (departureLocation && arrivalLocation) {
        const { latitude: depLat, longitude: depLon } = departureLocation;
        const { latitude: arrLat, longitude: arrLon } = arrivalLocation;
        route.distance = this.haversineDistance(depLat, depLon, arrLat, arrLon);
      } else {
        route.distance = 0; // or handle the error as needed
      }
      return route;
    });
  }

  async onApplicationBootstrap() {
    const locationRepository = this.dataSource.getRepository(LocationEntity);
    const transportRepository = this.dataSource.getRepository(TransportEntity);
    const routeRepository = this.dataSource.getRepository(RouteEntity);

    const locationCount = await locationRepository.count();
    if (locationCount === 0) {
      const duplicateNames = this.checkForDuplicateNames(locationData);

      if (duplicateNames.length > 0) {
        console.log('Duplicate location names found:', duplicateNames);
      } else {
        console.log('No duplicate location names found.');
        await locationRepository.save(locationData);
      }
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
      console.log('1. Calculating route distances...');
      const updatedRouteData = this.calculateRouteDistances(routeData);
      if (routeCount === 0) {
        console.log('2. Saving routes to the database...');
        await routeRepository.save(updatedRouteData);
      }
    }

    // const allRoutes = await routeRepository.find();
    // console.log(allRoutes.length);

  }
}