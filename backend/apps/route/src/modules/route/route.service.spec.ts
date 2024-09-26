import { Test, TestingModule } from '@nestjs/testing';
import { RoutesService } from './route.service';
import { RouteRepository } from './route.repository';
import { FilterRoutesDto } from './dto/route-filter.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';
import { CreateRoutesDto } from './dto/route-create.dto';
import { UpdateRoutesDto } from './dto/route-update.dto';

describe('RoutesService', () => {
  let service: RoutesService;
  let repository: RouteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesService,
        {
          provide: RouteRepository,
          useValue: {
            createQueryBuilder: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RoutesService>(RoutesService);
    repository = module.get<RouteRepository>(RouteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of routes', async () => {
      const filterRoutesDto: FilterRoutesDto = {
        search: '',
        name: '',
        departure: '',
        arrival: '',
        shipping_type: '',
        status: '',
        sort_field: '',
        sort_order: '',
        page: 1,
        limit: 10,
      };

      const result: ResponseDto<{ total: number, page: number, limit: number, routes: any[] }> = await service.findAll(filterRoutesDto);
      expect(result).toEqual(new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, {
        total: 0,
        page: 1,
        limit: 10,
        routes: [],
      }, []));
    });
  });

  describe('create', () => {
    it('should create a new route', async () => {
      const createRoutesDto: CreateRoutesDto = {
        name: 'Route 105',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 10000),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      repository.findOneBy = jest.fn().mockResolvedValue(null);
      repository.create = jest.fn().mockReturnValue(createRoutesDto);
      repository.save = jest.fn().mockResolvedValue(createRoutesDto);

      const result: ResponseDto<CreateRoutesDto> = await service.create(createRoutesDto);
      expect(result).toEqual(new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, createRoutesDto, []));
    });

    it('should throw an error if route name already exists', async () => {
      const createRoutesDto: CreateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 10000),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      repository.findOneBy = jest.fn().mockResolvedValue(createRoutesDto);

      await expect(service.create(createRoutesDto)).rejects.toThrow(CustomValidationError);
    });
  });

  describe('findOne', () => {
    it('should return a route', async () => {
      const route: { id: string, name: string } = { id: '10', name: 'Route K' };
      repository.findOneBy = jest.fn().mockResolvedValue(route);

      const result: ResponseDto<{ id: string, name: string }> = await service.findOne('10');
      expect(result).toEqual(new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, route, []));
    });

    it('should throw an error if route not found', async () => {
      repository.findOneBy = jest.fn().mockResolvedValue(null);
      await expect(service.findOne("0")).rejects.toThrow(CustomValidationError);
    });
  });

  describe('update', () => {
    it('should update a route', async () => {
      const updateRoutesDto: UpdateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 10000),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      const route = { id: '20', ...updateRoutesDto };

      jest.spyOn(service, 'findOne').mockImplementation((id: string) => {
        return Promise.resolve(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, route, []));
      });

      repository.save = jest.fn().mockResolvedValue({ id: '20', ...updateRoutesDto });

      const result = await service.update('20', updateRoutesDto);
      const expectedResult = { id: '20', ...updateRoutesDto };

      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, expectedResult, []));
    });

    it('should throw an error if departure and arrival are the same', async () => {
      const updateRoutesDto: UpdateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(),
        arrival_time: new Date(),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      await expect(service.update('1', updateRoutesDto)).rejects.toThrow(CustomValidationError);
    });
  });

  describe('remove', () => {
    it('should remove a route', async () => {
      repository.delete = jest.fn().mockResolvedValue(null);

      const result = await service.remove('10');
      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null));
    });

    it('should throw an error if route not found', async () => {
      repository.delete = jest.fn().mockRejectedValue(new Error());

      await expect(service.remove('0')).rejects.toThrow(CustomValidationError);
    });
  });

  describe('routeStatistics', () => {
    it('should return route statistics', async () => {
      repository.count = jest.fn().mockResolvedValue(10);
      repository.find = jest.fn().mockResolvedValue([
        { departure: { id: '1', name: 'Location A' }, arrival: { id: '2', name: 'Location B' } },
        { departure: { id: '1', name: 'Location A' }, arrival: { id: '3', name: 'Location C' } },
      ]);

      const result = await service.routeStatistics();
      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, {
        totalRoutes: 10,
        topLocations: [{ 'Location A': 2 }, { 'Location B': 1 }, { 'Location C': 1 }],
      }, []));
    });
  });
  describe('update', () => {
    it('should update a route', async () => {
      const updateRoutesDto: UpdateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 10000),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      const route = { id: '20' };
      repository.findOneBy = jest.fn().mockResolvedValue(route);
      repository.save = jest.fn().mockResolvedValue({ ...route, ...updateRoutesDto });

      const result = await service.update('20', updateRoutesDto);
      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { ...route, ...updateRoutesDto }, []));
    });

    it('should throw an error if departure and arrival are the same', async () => {
      const updateRoutesDto: UpdateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 10000),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      await expect(service.update('1', updateRoutesDto)).rejects.toThrow(CustomValidationError);
    });

    it('should throw an error if arrival time is before departure time', async () => {
      const updateRoutesDto: UpdateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(new Date().getTime() + 10000),
        arrival_time: new Date(),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      await expect(service.update('1', updateRoutesDto)).rejects.toThrow(CustomValidationError);
    });

    it('should throw an error if route not found', async () => {
      const updateRoutesDto: UpdateRoutesDto = {
        name: 'Route 10',
        departure: {
          id: '1',
          name: 'Hoan Kiem Lake',
          address: '79 Hang Trong, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.854444,
          latitude: 21.028511,
        },
        arrival: {
          id: '2',
          name: 'Ngoc Son Temple',
          address: 'Dinh Tien Hoang, Hoan Kiem, Hanoi, Vietnam',
          longitude: 105.851111,
          latitude: 21.033333,
        },
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 10000),
        transport: {
          id: '1',
          vehicle_type: 0,
          shipping_type: 0,
          name: 'Honda CBR',
          license_plate: 'ABC123'
        },
        distance: 100,
        status: 0,
      };

      repository.findOneBy = jest.fn().mockResolvedValue(null);

      await expect(service.update('1', updateRoutesDto)).rejects.toThrow(CustomValidationError);
    });
  });
});