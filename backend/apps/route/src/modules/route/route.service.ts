import { Injectable } from '@nestjs/common';
import { RouteRepository } from './route.repository';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from '../../common/dto/responseDto';
import { ResponseUnion } from '../../common/dto/responseUnion';
import { ResponseErrorDto } from '../../common/dto/responseError.dto';

@Injectable()
export class RoutesService {
  constructor(private routeRepository: RouteRepository) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Route[]>();
    try {
      const routes = await this.routeRepository.find();
      response.setStatus(200);
      response.setMessage('routes retrieved successfully');
      response.setData(routes);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('routes retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async create(
    createRoutesDto: CreateRoutesDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Route>();
    try {
      const route = this.routeRepository.create(createRoutesDto);
      await this.routeRepository.save(route);
      response.setStatus(200);
      response.setMessage('routes retrieved successfully');
      response.setData(route);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('routes retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Route>();
    try {
      const route = await this.routeRepository.findOneBy({ id });
      response.setStatus(200);
      response.setMessage('routes retrieved successfully');
      response.setData(route);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('routes retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async update(
    id: string,
    updateRoutesDto: UpdateRoutesDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Route>();
    try {
      const routeResponse = await this.findOne(id);

      if (routeResponse instanceof ResponseErrorDto) {
        return routeResponse;
      }

      const route = routeResponse.data as Route;
      Object.assign(route, updateRoutesDto);
      await this.routeRepository.save(route);
      response.setStatus(200);
      response.setMessage('routes retrieved successfully');
      response.setData(route);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('routes retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.routeRepository.delete(id);
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
