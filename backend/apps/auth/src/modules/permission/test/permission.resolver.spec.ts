import { Test, TestingModule } from '@nestjs/testing';
import { PermissionResolver } from '../permission.resolver';
import { PermissionService } from '../permission.service';
import { PermissionEntity } from '../entity/permission.entity';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { JwtModule } from '@nestjs/jwt';

describe('PermissionResolver', () => {
  let resolver: PermissionResolver;
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secret'
        }),
      ],
      providers: [
        PermissionResolver,
        {
          provide: PermissionService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            permissionStatistics: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PermissionResolver>(PermissionResolver);
    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getPermissions', () => {
    it('should return an array of permissions', async () => {
      const result = new ResponseDto<PermissionEntity[]>(
        200,
        'Permissions retrieved successfully',
        [
          { id: '1', name: 'Test Permission' } as PermissionEntity,
          { id: '2', name: 'Another Permission' } as PermissionEntity,
        ],
        null
      );

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await resolver.getPermissions()).toEqual(result);
    });
  });

  describe('getPermission', () => {
    it('should return a permission by id', async () => {
      const permission: PermissionEntity = {
        id: '1',
        name: 'Test Permission',
        description: 'This is a test permission',
        roles: []
      };

      const result = new ResponseDto<PermissionEntity>(
        200,
        'Permission retrieved successfully',
        permission,
        null
      );

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await resolver.getPermission('1')).toEqual(result);
    });
  });

  describe('permissionStatistics', () => {
    it('should return permission statistics', async () => {
      const result = new ResponseDto<number>(
        200,
        'Permission statistics retrieved successfully',
        5,
        null
      );

      jest.spyOn(service, 'permissionStatistics').mockResolvedValue(result);

      expect(await resolver.permissionStatistics()).toEqual(result);
    });
  });
});