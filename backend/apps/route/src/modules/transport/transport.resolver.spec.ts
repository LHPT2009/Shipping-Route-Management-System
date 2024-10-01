import { Test, TestingModule } from '@nestjs/testing';
import { TransportsResolver } from './transport.resolver';
import { TransportsService } from './transport.service';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { RoleGuard } from '../../../../../common/exception/guards/role.guard';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { listTransports } from './mock/list-transports';
import { totalTransports } from './mock/total-transports';

describe('TransportsResolver', () => {
  let resolver: TransportsResolver;
  let service: TransportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransportsResolver,
        {
          provide: TransportsService,
          useValue: {
            findAll: jest.fn(),
            transportStatistics: jest.fn(),
          },
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .overrideGuard(RoleGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .compile();

    resolver = module.get<TransportsResolver>(TransportsResolver);
    service = module.get<TransportsService>(TransportsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTransports', () => {
    it('should return an array of transports', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, listTransports, []);
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await resolver.getTransports()).toEqual(result);
    });
  });

  describe('transportStatistics', () => {
    it('should return transport statistics', async () => {
      const result = new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalTransports, []);
      jest.spyOn(service, 'transportStatistics').mockResolvedValue(result);
      expect(await resolver.transportStatistics()).toEqual(result);
    });
  });
});