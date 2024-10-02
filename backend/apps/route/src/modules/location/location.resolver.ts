import { Resolver, Query } from '@nestjs/graphql';
import { LocationsService } from './location.service';
import { Location } from './type/location.type';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { Roles } from '../../../../../common/exception/guards/decorator/roles.decorator';
import { ROLE } from '../../../../../common/constants/role';
import { Permissions } from '../../../../../common/exception/guards/decorator/permissions.decorator';
import { PERMISSION } from '../../../../../common/constants/permission';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { RoleGuard } from '../../../../../common/exception/guards/role.guard';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private locationsService: LocationsService) { }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_LOCATION)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<Location[]>)
  async getLocations(): Promise<ResponseDto<Location[]>> {
    return this.locationsService.findAll();
  }

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_LOCATION)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<number>)
  async locationStatistics(): Promise<ResponseDto<any>> {
    return this.locationsService.locationStatistics();
  }
}
