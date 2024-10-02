import { Test, TestingModule } from '@nestjs/testing';
import { RoutesResolver } from '../route.resolver';
import { RoutesService } from '../route.service';
import { CreateRoutesDto } from '../dto/route-create.dto';
import { UpdateRoutesDto } from '../dto/route-update.dto';
import { FilterRoutesDto } from '../dto/route-filter.dto';
import { JwtModule } from '@nestjs/jwt';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../../common/constants/status';
import { getRoute } from './mock/get-route';
import { statistizieRoute } from './mock/statisticize-route';

describe('RoutesResolver', () => {
  let resolver: RoutesResolver;
  let service: RoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret',
          signOptions: {
            expiresIn: '1d',
          },
        }),
      ],
      providers: [
        RoutesResolver,
        {
          provide: RoutesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            routeStatistics: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<RoutesResolver>(RoutesResolver);
    service = module.get<RoutesService>(RoutesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getRoutes', () => {
    it('should return a list of routes', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { routes: [], total: 0, page: 1, limit: 10 }, []);
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await resolver.getRoutes(new FilterRoutesDto())).toEqual(result);
    });
  });

  describe('getRoute', () => {
    it('should return a single route', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, getRoute, []);
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await resolver.getRoute('1')).toEqual(result);
    });
  });

  describe('createRoute', () => {
    it('should create and return a route', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, getRoute, []);
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await resolver.createRoute(new CreateRoutesDto())).toEqual(result);
    });
  });

  describe('updateRoute', () => {
    it('should update and return a route', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, getRoute, []);
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await resolver.updateRoute('1', new UpdateRoutesDto())).toEqual(result);
    });
  });

  describe('removeRoute', () => {
    it('should remove and return a route', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
      jest.spyOn(service, 'remove').mockResolvedValue(result);
      expect(await resolver.removeRoute('1')).toEqual(result);
    });
  });

  describe('routeStatistics', () => {
    it('should return route statistics', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, statistizieRoute, [])
      jest.spyOn(service, 'routeStatistics').mockResolvedValue(result);
      expect(await resolver.routeStatistics()).toEqual(result);
    });
  });
});