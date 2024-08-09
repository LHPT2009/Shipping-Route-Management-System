import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { Location } from './type/location.type';
import { CreateLocationDto } from './dto/location-create.dto';
import { UpdateLocationDto } from './dto/location-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { ResponseUnion } from '../../../../../common/response/responseUnion';
import { ResponseErrorDto } from '../../../../../common/response/responseError.dto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

@Injectable()
export class LocationsService {
  constructor(private locationRepository: LocationRepository) { }

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Location[]>();
    try {
      const locations = await this.locationRepository.find();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(locations);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }
  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Location>();
    try {
      const location = await this.locationRepository.findOneBy({ id });
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(location);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async create(
    createLocationDto: CreateLocationDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Location>();
    try {
      const location = this.locationRepository.create(createLocationDto);
      await this.locationRepository.save(location);
      response.setStatus(STATUS_CODE.CREATE);
      response.setMessage(STATUS.CREATE);
      response.setData(location);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Location>();
    try {
      const locationResponse = await this.findOne(id);

      if (locationResponse instanceof ResponseErrorDto) {
        return locationResponse;
      }

      const location = locationResponse.data as Location;
      Object.assign(location, updateLocationDto);
      await this.locationRepository.save(location);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(location);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.locationRepository.delete(id);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData('');
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }
}
