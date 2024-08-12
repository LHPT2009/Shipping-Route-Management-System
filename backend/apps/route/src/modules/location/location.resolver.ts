import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { LocationsService } from './location.service';
import { Location } from './type/location.type';
import { CreateLocationDto } from './dto/location-create.dto';
import { UpdateLocationDto } from './dto/location-update.dto';
import { ResponseDto } from 'common/response/responseDto';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private locationsService: LocationsService) { }

  @Query(() => ResponseDto<Location[]>)
  async getLocations(): Promise<ResponseDto<Location[]>> {
    return this.locationsService.findAll();
  }

  @Query(() => ResponseDto<Location>, { nullable: true })
  async getLocation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Location>> {
    return this.locationsService.findOne(id);
  }

  @Mutation(() => ResponseDto<Location>)
  async createLocation(
    @Args('input') input: CreateLocationDto,
  ): Promise<ResponseDto<Location>> {
    return this.locationsService.create(input);
  }

  @Mutation(() => ResponseDto<Location>)
  async updateLocation(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateLocationDto,
  ): Promise<ResponseDto<Location>> {
    return this.locationsService.update(id, input);
  }

  @Query(() => ResponseDto<Location>, { nullable: true })
  async removeLocation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Location>> {
    return this.locationsService.remove(id);
  }
}
