import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { Location } from './type/location.type';
import { CreateLocationDto } from './dto/location-create.dto';
import { UpdateLocationDto } from './dto/location-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

@Injectable()
export class LocationsService {
  constructor(private locationRepository: LocationRepository) { }

  async findAll(): Promise<ResponseDto<Location[]>> {
    try {
      const locations = await this.locationRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, locations, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
  async findOne(id: string): Promise<ResponseDto<Location>> {
    try {
      const location = await this.locationRepository.findOneBy({ id });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, location, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async create(
    createLocationDto: CreateLocationDto,
  ): Promise<ResponseDto<Location>> {
    try {
      const location = this.locationRepository.create(createLocationDto);
      await this.locationRepository.save(location);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, location, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<ResponseDto<Location>> {
    try {
      const locationResponse = await this.findOne(id);

      const location = locationResponse.data as Location;
      Object.assign(location, updateLocationDto);
      await this.locationRepository.save(location);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, location, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async remove(id: string): Promise<ResponseDto<Location>> {
    try {
      await this.locationRepository.delete(id);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, null, null);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async locationStatistics(): Promise<ResponseDto<number>> {
    try {
      const totalLocations = await this.locationRepository.count();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalLocations, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
