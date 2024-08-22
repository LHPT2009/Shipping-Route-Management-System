import { Injectable } from '@nestjs/common';
import { RouteRepository } from './route.repository';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

@Injectable()
export class RoutesService {
  constructor(private routeRepository: RouteRepository) { }

  async findAll(): Promise<ResponseDto<Route[]>> {
    try {
      const routes = await this.routeRepository.find();
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, routes, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async create(
    createRoutesDto: CreateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    try {
      const route = this.routeRepository.create(createRoutesDto);
      await this.routeRepository.save(route);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, route, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async findOne(id: string): Promise<ResponseDto<Route>> {
    try {
      const route = await this.routeRepository.findOneBy({ id });
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, route, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async update(
    id: string,
    updateRoutesDto: UpdateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    try {
      const routeResponse = await this.findOne(id);

      const route = routeResponse.data as Route;
      Object.assign(route, updateRoutesDto);
      await this.routeRepository.save(route);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, route, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async remove(id: string): Promise<ResponseDto<Route>> {
    try {
      await this.routeRepository.delete(id);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, null, null);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
