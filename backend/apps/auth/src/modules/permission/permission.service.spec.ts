import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from "../../../../../common/constants/status";

describe('PermissionService', () => {
    let service: PermissionService;
    let permissionRepository: PermissionRepository;

    const mockPermissionRepository = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PermissionService,
                {
                    provide: PermissionRepository,
                    useValue: mockPermissionRepository,
                },
            ],
        }).compile();

        service = module.get<PermissionService>(PermissionService);
        permissionRepository = module.get<PermissionRepository>(PermissionRepository);
    });

    describe('findAll', () => {
        it('should return a list of permissions', async () => {
            const result = [{ id: '1', name: 'permission1' }];
            mockPermissionRepository.find.mockResolvedValue(result);

            expect(await service.findAll()).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, result, []));
        });

        it('should handle errors', async () => {
            mockPermissionRepository.find.mockRejectedValue(new Error('error'));

            expect(await service.findAll()).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
        });
    });

    describe('findOne', () => {
        it('should return a permission by id', async () => {
            const result = { id: '1', name: 'permission1' };
            mockPermissionRepository.findOneBy.mockResolvedValue(result);

            expect(await service.findOne('1')).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, result, []));
        });

        it('should handle errors', async () => {
            mockPermissionRepository.findOneBy.mockRejectedValue(new Error('error'));

            expect(await service.findOne('1')).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
        });
    });

    describe('create', () => {
        it('should create a permission', async () => {
            const createPermissionDto: CreatePermissionDto = { name: 'permission1', description: "permission1description" };
            const result = { id: '1', ...createPermissionDto };
            mockPermissionRepository.create.mockReturnValue(result);
            mockPermissionRepository.save.mockResolvedValue(result);

            expect(await service.create(createPermissionDto)).toEqual(new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, result, []));
        });

        it('should handle errors', async () => {
            const createPermissionDto: CreatePermissionDto = { name: 'permission1', description: "permission1description" };
            mockPermissionRepository.create.mockReturnValue({});
            mockPermissionRepository.save.mockRejectedValue(new Error('error'));

            expect(await service.create(createPermissionDto)).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
        });
    });

    describe('update', () => {
        it('should update a permission', async () => {
            const updatePermissionDto: UpdatePermissionDto = { name: 'updatedPermission' };
            const existingPermission = { id: '1', name: 'permission1' };
            mockPermissionRepository.findOneBy.mockResolvedValue(existingPermission);
            mockPermissionRepository.save.mockResolvedValue({ ...existingPermission, ...updatePermissionDto });

            expect(await service.update('1', updatePermissionDto)).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, { ...existingPermission, ...updatePermissionDto }, []));
        });

        it('should handle errors', async () => {
            const updatePermissionDto: UpdatePermissionDto = { name: 'updatedPermission' };
            mockPermissionRepository.findOneBy.mockRejectedValue(new Error('error'));

            expect(await service.update('1', updatePermissionDto)).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
        });
    });

    describe('remove', () => {
        it('should remove a permission', async () => {
            mockPermissionRepository.delete.mockResolvedValue({ affected: 1 });

            expect(await service.remove('1')).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null));
        });

        it('should handle errors', async () => {
            mockPermissionRepository.delete.mockRejectedValue(new Error('error'));

            expect(await service.remove('1')).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
        });
    });

    describe('permissionStatistics', () => {
        it('should return the total count of permissions', async () => {
            mockPermissionRepository.count.mockResolvedValue(10);

            expect(await service.permissionStatistics()).toEqual(new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, 10, []));
        });

        it('should handle errors', async () => {
            mockPermissionRepository.count.mockRejectedValue(new Error('error'));

            expect(await service.permissionStatistics()).toEqual(new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null));
        });
    });
});