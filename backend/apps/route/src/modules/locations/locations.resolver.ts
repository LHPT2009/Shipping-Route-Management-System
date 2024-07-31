import { Resolver, Query } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { Location } from '../database/entities/locations.entity';
// import { LocationType } from '../database/types/locations.type';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private locationsService: LocationsService) {}

  @Query(() => Location)
  async getLocations(): Promise<Location[]> {
    return this.locationsService.findAll();
  }
}
