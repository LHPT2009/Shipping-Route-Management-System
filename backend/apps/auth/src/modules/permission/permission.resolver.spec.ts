import { Test, TestingModule } from '@nestjs/testing';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { PermissionEntity } from './entity/permission.entity';
import { ResponseDto } from '../../../../../common/response/responseDto';

describe('PermissionResolver', () => {
    let resolver: PermissionResolver;
    let service: PermissionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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
            // Tạo một permission mẫu với đầy đủ các trường cần thiết
            const permission: PermissionEntity = {
                id: '1',
                name: 'Test Permission',
                description: 'This is a test permission', // Thêm trường description
                roles: [] // Giả sử chưa có roles, bạn có thể thêm nếu cần
            };

            const result = new ResponseDto<PermissionEntity>(
                200, // status
                'Permission retrieved successfully', // message
                permission, // data
                null // error
            );

            // Mock findOne method of the service to return a ResponseDto<PermissionEntity>
            jest.spyOn(service, 'findOne').mockResolvedValue(result);

            // Expect resolver to return the correct result
            expect(await resolver.getPermission('1')).toEqual(result);
        });
    });

    describe('createPermission', () => {
        it('should create and return a new permission', async () => {
            // Tạo đối tượng input với cả name và description
            const input: CreatePermissionDto = {
                name: 'New Permission',
                description: 'This is a new permission', // Thêm trường description
            };

            // Giả sử kết quả trả về từ service là một ResponseDto
            const result = new ResponseDto<PermissionEntity>(
                201, // status
                'Permission created successfully', // message
                { id: '1', name: 'New Permission', description: 'This is a new permission', roles: [] }, // data
                null // error
            );

            jest.spyOn(service, 'create').mockResolvedValue(result);

            // Kiểm tra xem resolver trả về kết quả đúng
            expect(await resolver.createPermission(input)).toEqual(result);
        });
    });

    describe('updatePermission', () => {
        it('should update and return the updated permission', async () => {
            const input: UpdatePermissionDto = {
                name: 'Updated Permission',
                description: 'This is an updated permission' // Thêm trường description nếu cần
            };

            // Tạo một đối tượng ResponseDto với permission đã cập nhật
            const result = new ResponseDto<PermissionEntity>(
                200, // status
                'Permission updated successfully', // message
                { id: '1', name: 'Updated Permission', description: 'This is an updated permission', roles: [] }, // data
                null // error
            );

            jest.spyOn(service, 'update').mockResolvedValue(result);

            // Kiểm tra xem resolver trả về kết quả đúng
            expect(await resolver.updatePermission('1', input)).toEqual(result);
        });
    });

    describe('removePermission', () => {
        it('should remove and return the removed permission', async () => {
            // Tạo đối tượng ResponseDto với quyền đã bị xóa
            const result = new ResponseDto<PermissionEntity>(
                200, // status
                'Permission removed successfully', // message
                { id: '1', name: 'Removed Permission', description: 'This permission has been removed', roles: [] }, // data
                null // error
            );

            // Giả lập phương thức remove của service để trả về đối tượng ResponseDto
            jest.spyOn(service, 'remove').mockResolvedValue(result);

            // Kiểm tra xem resolver trả về đúng kết quả
            expect(await resolver.removePermission('1')).toEqual(result);
        });
    });

    describe('permissionStatistics', () => {
        it('should return permission statistics', async () => {
            // Tạo đối tượng ResponseDto cho thống kê quyền
            const result = new ResponseDto<number>(
                200, // status
                'Permission statistics retrieved successfully', // message
                5, // data
                null // error
            );

            // Giả lập phương thức permissionStatistics của service để trả về đối tượng ResponseDto
            jest.spyOn(service, 'permissionStatistics').mockResolvedValue(result);

            // Kiểm tra xem resolver trả về đúng kết quả
            expect(await resolver.permissionStatistics()).toEqual(result);
        });
    });
});