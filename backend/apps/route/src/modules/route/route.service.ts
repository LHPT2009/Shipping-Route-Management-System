import { Injectable } from '@nestjs/common';
import { RouteRepository } from './route.repository';
import { Route } from './type/route.type';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { FilterRoutesDto } from './dto/route-filter.dto';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { ShippingTypeEnum } from '../transport/interface/transports.interface';
import { StatusEnum } from './interface/routes.interface';
import { FilterRouteType } from './type/route-filter.type';

@Injectable()
export class RoutesService {
  constructor(
    private routeRepository: RouteRepository,
  ) { }

  async findAll(filterRoutesDto: FilterRoutesDto): Promise<ResponseDto<{
    routes: FilterRouteType[];
    total: number;
    page: number;
    limit: number;
  }>> {
    try {

      const queryBuilder = this.routeRepository.createQueryBuilder('route')
        .leftJoinAndSelect('route.departure', 'departure')
        .leftJoinAndSelect('route.arrival', 'arrival')
        .leftJoinAndSelect('route.transport', 'transport');

      if (filterRoutesDto.search) {
        queryBuilder.andWhere('(LOWER(route.name) LIKE LOWER(:search) OR LOWER(departure.name) LIKE LOWER(:search) OR LOWER(arrival.name) LIKE LOWER(:search))', {
          search: `%${filterRoutesDto.search.toLowerCase()}%`
        });
      }
      if (filterRoutesDto.name) {
        queryBuilder.andWhere('LOWER(route.name) LIKE LOWER(:name)', { name: `%${filterRoutesDto.name.toLowerCase()}%` });
      }
      if (filterRoutesDto.departure) {
        queryBuilder.andWhere('LOWER(departure.name) LIKE LOWER(:departure)', { departure: `%${filterRoutesDto.departure.toLowerCase()}%` });
      }
      if (filterRoutesDto.arrival) {
        queryBuilder.andWhere('LOWER(arrival.name) LIKE LOWER(:arrival)', { arrival: `%${filterRoutesDto.arrival.toLowerCase()}%` });
      }
      if (filterRoutesDto.shipping_type) {
        const shippingTypeEnumValue = ShippingTypeEnum[filterRoutesDto.shipping_type as keyof typeof ShippingTypeEnum];
        queryBuilder.andWhere('transport.shipping_type = :shipping_type', { shipping_type: shippingTypeEnumValue });
      }
      if (filterRoutesDto.status) {
        const statusEnumValue = StatusEnum[filterRoutesDto.status as keyof typeof StatusEnum];
        queryBuilder.andWhere('route.status = :status', { status: statusEnumValue });
      }
      if (filterRoutesDto.sort_field && filterRoutesDto.sort_order) {
        if (filterRoutesDto.sort_field === 'departure') {
          queryBuilder.orderBy('departure.name', filterRoutesDto.sort_order === 'ascend' ? 'ASC' : 'DESC');
        } else if (filterRoutesDto.sort_field === 'arrival') {
          queryBuilder.orderBy('arrival.name', filterRoutesDto.sort_order === 'ascend' ? 'ASC' : 'DESC');
        } else {
          queryBuilder.orderBy(`route.${filterRoutesDto.sort_field}`, filterRoutesDto.sort_order === 'ascend' ? 'ASC' : 'DESC');
        }
      }

      const [routes, total] = await queryBuilder
        .skip((filterRoutesDto.page - 1) * filterRoutesDto.limit)
        .take(filterRoutesDto.limit)
        .getManyAndCount();

      let routesResponse = routes.map((route) => {
        return {
          id: route.id,
          name: route.name,
          departure: route.departure.name,
          arrival: route.arrival.name,
          shipping_type: ShippingTypeEnum[route.transport.shipping_type],
          distance: `${route.distance} km`,
          status: StatusEnum[route.status],
          departureLongitude: route.departure.longitude,
          departureLatitude: route.departure.latitude,
          arrivalLongitude: route.arrival.longitude,
          arrivalLatitude: route.arrival.latitude,
        };
      });

      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, {
        total,
        page: filterRoutesDto.page,
        limit: filterRoutesDto.limit,
        routes: routesResponse,
      }, []);

    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { route: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }

  async create(
    createRoutesDto: CreateRoutesDto,
  ): Promise<ResponseDto<Route>> {

    console.log(createRoutesDto)

    if (createRoutesDto.departure === createRoutesDto.arrival) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { arrival: ['Departure and arrival must be different'] });
    }
    if (new Date(createRoutesDto.departure_time) > new Date(createRoutesDto.arrival_time)) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { arrival_time: ['Arrival time must be later than departure time'] });
    }

    const isExistRouteName = await this.routeRepository.findOneBy({ name: createRoutesDto.name });
    if (isExistRouteName) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { name: ['Route name already exists'] });
    }

    const route = this.routeRepository.create(createRoutesDto);
    await this.routeRepository.save(route);
    return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, route, []);
  }

  async findOne(id: string): Promise<ResponseDto<Route>> {
    const route = await this.routeRepository.findOneBy({ id });
    if (!route) {
      throw new CustomValidationError(STATUS.ERR_NOT_FOUND, { route: ["Route is not exist"] });
    }
    return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, route, []);
  }

  async update(
    id: string,
    updateRoutesDto: UpdateRoutesDto,
  ): Promise<ResponseDto<Route>> {
    if (updateRoutesDto.departure === updateRoutesDto.arrival) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { arrival: ['Departure and arrival must be different'] });
    }
    if (new Date(updateRoutesDto.departure_time) > new Date(updateRoutesDto.arrival_time)) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { arrival_time: ['Arrival time must be later than departure time'] });
    }
    
    const routeResponse = await this.findOne(id);

    const route = routeResponse.data as Route;
    Object.assign(route, updateRoutesDto);
    await this.routeRepository.save(route);
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, route, []);

  }

  async remove(id: string): Promise<ResponseDto<Route>> {
    try {
      await this.routeRepository.delete(id);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { route: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }

  async routeStatistics(): Promise<ResponseDto<any>> {
    try {
      const totalRoutes = await this.routeRepository.count();
      const routes = await this.routeRepository.find();

      const locationCounts: { [key: string]: { count: number, name: string } } = {};

      routes.forEach(route => {
        if (route.departure) {
          const departureId = route.departure.id;
          const departureName = route.departure.name;
          if (!locationCounts[departureId]) {
            locationCounts[departureId] = { count: 0, name: departureName };
          }
          locationCounts[departureId].count += 1;
        }
        if (route.arrival) {
          const arrivalId = route.arrival.id;
          const arrivalName = route.arrival.name;
          if (!locationCounts[arrivalId]) {
            locationCounts[arrivalId] = { count: 0, name: arrivalName };
          }
          locationCounts[arrivalId].count += 1;
        }
      });

      const sortedLocations = Object.entries(locationCounts)
        .map(([id, { count, name }]) => ({ [name]: count }));

      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, {
        totalRoutes,
        topLocations: sortedLocations,
      }, []);

    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { route: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }
}
