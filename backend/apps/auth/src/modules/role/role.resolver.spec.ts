import { Test, TestingModule } from '@nestjs/testing';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';
import { RoleEntity } from './entity/role.entity';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { JwtService } from '@nestjs/jwt';

describe('RoleResolver', () => {
    let resolver: RoleResolver;
    let service: RoleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleResolver,
                {
                    provide: RoleService,
                    useValue: {
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        addPermissionToRole: jest.fn(),
                        roleStatistics: jest.fn(),
                    },
                },
                {
                    provide: JwtService, // Mock the JwtService if it's used within the resolver or service
                    useValue: {
                        sign: jest.fn(), // Mock the sign method, or others you may use
                    },
                },
            ],
        }).compile();

        resolver = module.get<RoleResolver>(RoleResolver);
        service = module.get<RoleService>(RoleService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('getRoles', () => {
        it('should return an array of roles', async () => {
            const result = new ResponseDto<RoleEntity[]>(
                200,
                'Roles retrieved successfully',
                [
                    { id: '1', name: 'Admin' } as RoleEntity,
                    { id: '2', name: 'User' } as RoleEntity,
                ],
                null,
            );

            jest.spyOn(service, 'findAll').mockResolvedValue(result);

            expect(await resolver.getRoles()).toEqual(result);
        });
    });

    describe('getRole', () => {
        it('should return a role by id', async () => {
            const role: RoleEntity = {
                id: '1',
                name: 'Admin',
                permissions: [],
                users: []
            };

            const result = new ResponseDto<RoleEntity>(
                200,
                'Role retrieved successfully',
                role,
                null,
            );

            jest.spyOn(service, 'findOne').mockResolvedValue(result);

            expect(await resolver.getRole('1')).toEqual(result);
        });
    });

    describe('createRole', () => {
        it('should create and return a new role', async () => {
            const input: CreateRoleDto = {
                name: 'New Role',
            };

            const result = new ResponseDto<RoleEntity>(
                201,
                'Role created successfully',
                { id: '1', name: 'New Role', permissions: [] } as RoleEntity,
                null,
            );

            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await resolver.createRole(input)).toEqual(result);
        });
    });

    describe('updateRole', () => {
        it('should update and return the updated role', async () => {
            const input: UpdateRoleDto = {
                name: 'Updated Role',
            };

            const result = new ResponseDto<RoleEntity>(
                200,
                'Role updated successfully',
                { id: '1', name: 'Updated Role', permissions: [] } as RoleEntity,
                null,
            );

            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await resolver.updateRole('1', input)).toEqual(result);
        });
    });

    describe('removeRole', () => {
        it('should remove and return the removed role', async () => {
            const result = new ResponseDto<RoleEntity>(
                200,
                'Role removed successfully',
                { id: '1', name: 'Removed Role', permissions: [] } as RoleEntity,
                null,
            );

            jest.spyOn(service, 'remove').mockResolvedValue(result);

            expect(await resolver.removeRole('1')).toEqual(result);
        });
    });

    describe('addPermissionToRole', () => {
        it('should add a permission to a role and return the role', async () => {
            const input: PermissionToRoleDto = {
                roleId: '1',
                permissionIds: ['101'],
            };

            const result = new ResponseDto<RoleEntity>(
                200,
                'Permission added to role successfully',
                { id: '1', name: 'Admin', permissions: [] } as RoleEntity,
                null,
            );

            jest.spyOn(service, 'addPermissionToRole').mockResolvedValue(result);

            expect(await resolver.addPermissionToRole(input)).toEqual(result);
        });
    });

    describe('roleStatistics', () => {
        it('should return role statistics', async () => {
            const result = new ResponseDto<number>(
                200,
                'Role statistics retrieved successfully',
                5,
                null,
            );

            jest.spyOn(service, 'roleStatistics').mockResolvedValue(result);

            expect(await resolver.roleStatistics()).toEqual(result);
        });
    });
});