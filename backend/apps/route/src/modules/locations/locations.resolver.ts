import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { Location } from './type/location.type';
import { CreateLocationDto } from './dto/location-create.dto';
import { UpdateLocationDto } from './dto/location-update.dto';
import { ResponseUnion } from '../../common/dto/responseUnion';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private locationsService: LocationsService) {}

  @Query(() => ResponseUnion)
  async getLocations(): Promise<typeof ResponseUnion> {
    return this.locationsService.findAll();
  }

  @Query(() => ResponseUnion, { nullable: true })
  async getLocation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.locationsService.findOne(id);
  }

  @Mutation(() => ResponseUnion)
  async createLocation(
    @Args('createLocationDto') createLocationDto: CreateLocationDto,
  ): Promise<typeof ResponseUnion> {
    return this.locationsService.create(createLocationDto);
  }

  @Mutation(() => ResponseUnion)
  async updateLocation(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateLocationDto') updateLocationDto: UpdateLocationDto,
  ): Promise<typeof ResponseUnion> {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Query(() => ResponseUnion, { nullable: true })
  async removeLocation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.locationsService.remove(id);
  }
}
