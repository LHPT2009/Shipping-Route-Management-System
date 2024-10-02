import { Test, TestingModule } from '@nestjs/testing';
import { TransportsService } from '../transport.service';
import { TransportRepository } from '../transport.repository';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../../common/exception/validation/custom-validation-error';
import { listTransports } from './mock/list-transports';
import { totalTransports } from './mock/total-transports';

describe('TransportsService', () => {
  let service: TransportsService;
  let repository: TransportRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransportsService,
        {
          provide: TransportRepository,
          useValue: {
            find: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransportsService>(TransportsService);
    repository = module.get<TransportRepository>(TransportRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of transports', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, listTransports, []);
      repository.find = jest.fn().mockResolvedValue(listTransports);
      expect(await service.findAll()).toEqual(result);
    });

    it('should throw a CustomValidationError on failure', async () => {
      repository.find = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      await expect(service.findAll()).rejects.toThrow(CustomValidationError);
    });
  });

  describe('transportStatistics', () => {
    it('should return the total number of transports', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalTransports, []);
      repository.count = jest.fn().mockResolvedValue(totalTransports);
      expect(await service.transportStatistics()).toEqual(result);
    });

    it('should throw a CustomValidationError if an error occurs', async () => {
      repository.count = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
      await expect(service.transportStatistics()).rejects.toThrow(CustomValidationError);
    });
  });
});