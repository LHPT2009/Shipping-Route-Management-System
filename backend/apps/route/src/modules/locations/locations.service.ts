import { Injectable } from '@nestjs/common';
import { LocationRepository } from './locations.repository';
import { Location } from './type/location.type';
import { CreateLocationDto } from './dto/location-create.dto';
import { UpdateLocationDto } from './dto/location-update.dto';
import { ResponseDto } from '../../common/dto/responseDto';
import { ResponseErrorDto } from '../../common/dto/responseError.dto';
import { ResponseUnion } from '../../common/dto/responseUnion';

@Injectable()
export class LocationsService {
  constructor(private locationRepository: LocationRepository) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Location[]>();
    try {
      const locations = await this.locationRepository.find();
      response.setStatus(200);
      response.setMessage('Locations retrieved successfully');
      response.setData(locations);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Locations retrieved Error');
      response.setError('asdas');
      return response;
    }
  }
  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Location>();
    try {
      const location = await this.locationRepository.findOneBy({ id });
      response.setStatus(200);
      response.setMessage('Locations retrieved successfully');
      response.setData(location);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Locations retrieved Error');
      response.setError('asdas');
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
      response.setStatus(200);
      response.setMessage('Locations retrieved successfully');
      response.setData(location);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Locations retrieved Error');
      response.setError('asdas');
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
      response.setStatus(200);
      response.setMessage('Locations retrieved successfully');
      response.setData(location);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Locations retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.locationRepository.delete(id);
      response.setStatus(200);
      response.setMessage('Delete Successfully');
      response.setData('');
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Locations retrieved Error');
      response.setError('asdas');
      return response;
    }
  }
}
