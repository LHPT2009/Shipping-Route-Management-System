import { Injectable } from '@nestjs/common';
import { RouteRepository } from './route.repository';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { ResponseUnion } from '../../../../../common/response/responseUnion';
import { ResponseErrorDto } from '../../../../../common/response/responseError.dto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

@Injectable()
export class RoutesService {
  constructor(private routeRepository: RouteRepository) { }

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Route[]>();
    try {
      const routes = await this.routeRepository.find();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(routes);
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
    createRoutesDto: CreateRoutesDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Route>();
    try {
      const route = this.routeRepository.create(createRoutesDto);
      await this.routeRepository.save(route);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(route);
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
    const response = new ResponseDto<Route>();
    try {
      const route = await this.routeRepository.findOneBy({ id });
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(route);
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
      response.setStatus(STATUS_CODE.CREATE);
      response.setMessage(STATUS.CREATE);
      response.setData(route);
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
      await this.routeRepository.delete(id);
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
