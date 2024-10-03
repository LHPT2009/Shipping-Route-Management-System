import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '../role.service';
import { RoleRepository } from '../role.repository';
import { UserRepository } from '../../user/user.repository';
import { PermissionRepository } from '../../permission/permission.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateRoleDto } from '../dto/role-create.dto';
import { UpdateRoleDto } from '../dto/role-update.dto';
import { PermissionToRoleDto } from '../dto/permission-to-role.dto';
import { RoleEntity } from '../entity/role.entity';
import { ResponseDto } from '../../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../../common/exception/validation/custom-validation-error';
import { PermissionEntity } from '../../permission/entity/permission.entity';

describe('RoleService', () => {
  let service: RoleService;

  const mockRoleRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };

  const mockUserRepository = {
    find: jest.fn(),
  };

  const mockPermissionRepository = {
    findBy: jest.fn(),
  };

  const mockCacheManager = {
    set: jest.fn(),
    del: jest.fn(),
    store: {
      keys: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: RoleRepository,
          useValue: mockRoleRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: PermissionRepository,
          useValue: mockPermissionRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of roles', async () => {
      const roles = [{ id: '1', name: 'Admin', permissions: [] }];
      mockRoleRepository.find.mockResolvedValue(roles);

      expect(await service.findAll()).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, roles, []));
    });

    it('should handle errors', async () => {
      mockRoleRepository.find.mockRejectedValue(new Error('error'));

      expect(await service.findAll()).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const role = { id: '1', name: 'Admin', permissions: [] };
      mockRoleRepository.findOne.mockResolvedValue(role);

      expect(await service.findOne('1')).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, role, []));
    });

    it('should handle errors', async () => {
      mockRoleRepository.findOne.mockRejectedValue(new Error('error'));

      expect(await service.findOne('1')).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
    });
  });

  describe('create', () => {
    it('should create a role', async () => {
      const createRoleDto: CreateRoleDto = { name: 'Admin' };
      const role = { id: '1', ...createRoleDto };

      mockRoleRepository.findOne.mockResolvedValue(null);
      mockRoleRepository.create.mockReturnValue(role);
      mockRoleRepository.save.mockResolvedValue(role);

      expect(await service.create(createRoleDto)).toEqual(new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, role, []));
    });

    it('should handle validation error when role name exists', async () => {
      const createRoleDto: CreateRoleDto = { name: 'Admin' };
      const existingRole = { id: '1', name: 'Admin' };

      mockRoleRepository.findOne.mockResolvedValue(existingRole);

      await expect(service.create(createRoleDto)).rejects.toThrowError(
        new CustomValidationError(STATUS.ERR_VALIDATION, { name: ['Name already exists'] })
      );
    });
  });

  describe('update', () => {
    it('should successfully update a role and refresh the cache', async () => {
      const roleId = '1';
      const updateRoleDto: UpdateRoleDto = { name: 'Updated Role' };
      const existingRole = null;

      const roleToUpdate = new RoleEntity(roleId, 'Old Role');
      roleToUpdate.permissions = [new PermissionEntity()];
      roleToUpdate.permissions[0].name = 'VIEW_USERS';

      const usersAffected = ['user1', 'user2'];

      mockRoleRepository.findOne
        .mockResolvedValueOnce(existingRole)
        .mockResolvedValueOnce(roleToUpdate);

      jest.spyOn(service, 'usersInRedisAffectedByRole').mockResolvedValue(usersAffected);

      mockCacheManager.store.keys.mockResolvedValueOnce(usersAffected);

      const result = await service.update(roleId, updateRoleDto);

      expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ where: { name: updateRoleDto.name } });
      expect(mockRoleRepository.save).toHaveBeenCalledWith(expect.objectContaining({ name: updateRoleDto.name }));
      expect(mockCacheManager.set).toHaveBeenCalledTimes(usersAffected.length);

      usersAffected.forEach(userId => {
        expect(mockCacheManager.set).toHaveBeenCalledWith(userId, expect.objectContaining({ role: updateRoleDto.name }));
      });

      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, roleToUpdate, []));
    });

    it('should throw an error if the role name already exists', async () => {
      const roleId = '1';
      const updateRoleDto: UpdateRoleDto = { name: 'Existing Role' };

      const existingRole = new RoleEntity(roleId, 'Existing Role');

      mockRoleRepository.findOne.mockResolvedValueOnce(existingRole);

      await expect(service.update(roleId, updateRoleDto)).rejects.toThrow(CustomValidationError);
    });
  });

  describe('remove', () => {
    it('should remove a role successfully', async () => {
      mockUserRepository.find.mockResolvedValue([]);
      mockRoleRepository.findOne.mockResolvedValue({ id: '1', permissions: [] });
      mockRoleRepository.delete.mockResolvedValue({ affected: 1 });
      mockCacheManager.del.mockResolvedValue(undefined);
      jest.spyOn(service, 'usersInRedisAffectedByRole').mockResolvedValue(['1', '2']);

      const result = await service.remove('1');

      expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null));
    });
  });

  describe('addPermissionToRole', () => {
    it('should add permissions to a role', async () => {
      const input: PermissionToRoleDto = { roleId: '1', permissionIds: ['101', '102'] };
      const role = { id: '1', name: 'Admin', permissions: [] };
      const permissions = [
        { id: '101', name: 'Permission1' },
        { id: '102', name: 'Permission2' },
      ];

      mockRoleRepository.findOne.mockResolvedValue(role);
      mockPermissionRepository.findBy.mockResolvedValue(permissions);
      mockRoleRepository.save.mockResolvedValue({ ...role, permissions });

      mockCacheManager.store.keys.mockResolvedValue(['1', '2']);
      mockUserRepository.find.mockResolvedValue([{ id: '1', roles: role }]);
      mockCacheManager.set.mockResolvedValue(undefined);

      expect(await service.addPermissionToRole(input)).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { ...role, permissions }, null));
    });

    it('should handle not found error when role does not exist', async () => {
      const input: PermissionToRoleDto = { roleId: '1', permissionIds: ['101', '102'] };
      mockRoleRepository.findOne.mockResolvedValue(null);

      expect(await service.addPermissionToRole(input)).toEqual(
        new ResponseDto(STATUS_CODE.ERR_NOT_FOUND, STATUS.ERR_NOT_FOUND, null, { message: 'Role with ID 1 not found' })
      );
    });

    it('should handle not found error when some permissions do not exist', async () => {
      const input: PermissionToRoleDto = { roleId: '1', permissionIds: ['101', '102'] };
      const role = { id: '1', name: 'Admin', permissions: [] };
      const permissions = [{ id: '101', name: 'Permission1' }];

      mockRoleRepository.findOne.mockResolvedValue(role);
      mockPermissionRepository.findBy.mockResolvedValue(permissions);

      expect(await service.addPermissionToRole(input)).toEqual(
        new ResponseDto(STATUS_CODE.ERR_NOT_FOUND, STATUS.ERR_NOT_FOUND, null, { message: 'Some permissions were not found' })
      );
    });
  });

  describe('roleStatistics', () => {
    it('should return the total count of roles', async () => {
      mockRoleRepository.count.mockResolvedValue(5);

      expect(await service.roleStatistics()).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, 5, []));
    });

    it('should handle errors', async () => {
      mockRoleRepository.count.mockRejectedValue(new Error('error'));

      expect(await service.roleStatistics()).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
    });
  });
});