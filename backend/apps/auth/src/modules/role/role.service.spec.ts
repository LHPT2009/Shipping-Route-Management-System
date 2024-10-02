import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { UserRepository } from '../user/user.repository';
import { PermissionRepository } from '../permission/permission.repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';
import { RoleEntity } from './entity/role.entity';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';

describe('RoleService', () => {
    let service: RoleService;
    let roleRepository: RoleRepository;
    let userRepository: UserRepository;
    let permissionRepository: PermissionRepository;
    let cacheManager: Cache;

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
        roleRepository = module.get<RoleRepository>(RoleRepository);
        userRepository = module.get<UserRepository>(UserRepository);
        permissionRepository = module.get<PermissionRepository>(PermissionRepository);
        cacheManager = module.get<Cache>(CACHE_MANAGER);
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

    // describe('update', () => {
    //     it('should update a role successfully', async () => {
    //         const id = '1';
    //         const updateRoleDto = { name: 'updatedRole' };
    //         const existingRole = { id: '1', name: 'role1', permissions: [] };

    //         mockRoleRepository.findOne.mockResolvedValue(null);
    //         mockRoleRepository.findOne.mockResolvedValue(existingRole);
    //         mockRoleRepository.save.mockResolvedValue({ ...existingRole, ...updateRoleDto });

    //         const result = await service.update(id, updateRoleDto);

    //         expect(result).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { ...existingRole, ...updateRoleDto }, []));
    //     });
    // });

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