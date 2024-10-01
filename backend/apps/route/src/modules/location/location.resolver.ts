import { Resolver, Query } from '@nestjs/graphql';
import { LocationsService } from './location.service';
import { Location } from './type/location.type';
import { ResponseDto } from '../../../../../common/response/responseDto';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private locationsService: LocationsService) { }

  @Query(() => ResponseDto<Location[]>)
  async getLocations(): Promise<ResponseDto<Location[]>> {
    return this.locationsService.findAll();
  }

  @Query(() => ResponseDto<number>)
  async locationStatistics(): Promise<ResponseDto<any>> {
    return this.locationsService.locationStatistics();
  }
}
