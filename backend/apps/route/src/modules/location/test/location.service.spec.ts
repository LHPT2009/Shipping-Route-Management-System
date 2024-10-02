import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from '../location.service';
import { LocationRepository } from '../location.repository';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../../common/constants/status';
import { listLocations } from './mock/list-locations';
import { CustomValidationError } from '../../../../../../common/exception/validation/custom-validation-error';
import { totalLocations } from './mock/total-locations';

describe('LocationsService', () => {
  let service: LocationsService;
  let repository: LocationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: LocationRepository,
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    repository = module.get<LocationRepository>(LocationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, listLocations, []);
      repository.find = jest.fn().mockResolvedValue(listLocations);
      expect(await service.findAll()).toEqual(result);
    });

    it('should throw a CustomValidationError if an error occurs', async () => {
      repository.find = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      await expect(service.findAll()).rejects.toThrow(CustomValidationError);
    });
  });

  describe('locationStatistics', () => {
    it('should return the total number of locations', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalLocations, []);
      repository.count = jest.fn().mockResolvedValue(totalLocations);
      expect(await service.locationStatistics()).toEqual(result);
    });

    it('should throw a CustomValidationError if an error occurs', async () => {
      repository.count = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      await expect(service.locationStatistics()).rejects.toThrow(CustomValidationError);
    });
  });

});