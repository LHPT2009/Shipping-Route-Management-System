import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { Location } from './type/location.type';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';

@Injectable()
export class LocationsService {
  constructor(private locationRepository: LocationRepository) { }

  async findAll(): Promise<ResponseDto<Location[]>> {
    try {
      const locations = await this.locationRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, locations, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { location: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }

  async locationStatistics(): Promise<ResponseDto<number>> {
    try {
      const totalLocations = await this.locationRepository.count();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalLocations, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { location: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }
}
