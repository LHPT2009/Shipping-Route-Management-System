import { Test, TestingModule } from '@nestjs/testing';
import { LocationsResolver } from '../location.resolver';
import { LocationsService } from '../location.service';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { listLocations } from './mock/list-locations';
import { STATUS, STATUS_CODE } from '../../../../../../common/constants/status';
import { totalLocations } from './mock/total-locations';

describe('LocationsResolver', () => {
  let resolver: LocationsResolver;
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsResolver,
        {
          provide: LocationsService,
          useValue: {
            findAll: jest.fn(),
            locationStatistics: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<LocationsResolver>(LocationsResolver);
    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getLocations', () => {
    it('should return an array of locations', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, listLocations, []);
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await resolver.getLocations()).toEqual(result);
    });
  });

  describe('locationStatistics', () => {
    it('should return location statistics', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalLocations, []);
      jest.spyOn(service, 'locationStatistics').mockResolvedValue(result);
      expect(await resolver.locationStatistics()).toEqual(result);
    });
  });
});