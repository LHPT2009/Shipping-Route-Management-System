import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { JwtService } from '@nestjs/jwt';
import { ProducerService } from '../kafka/producer.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FilterUsersDto } from './dto/user-filter.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        createQueryBuilder: jest.fn(() => ({
                            leftJoinAndSelect: jest.fn().mockReturnThis(),
                            andWhere: jest.fn().mockReturnThis(),
                            orderBy: jest.fn().mockReturnThis(),
                            skip: jest.fn().mockReturnThis(),
                            take: jest.fn().mockReturnThis(),
                            getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
                        })),
                    },
                },
                {
                    provide: RoleRepository,
                    useValue: {}, // Mock RoleRepository if needed
                },
                {
                    provide: JwtService,
                    useValue: {}, // Mock JwtService if needed
                },
                {
                    provide: ProducerService,
                    useValue: {}, // Mock ProducerService if needed
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        set: jest.fn(),
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return users with pagination', async () => {
            const filterUsersDto: FilterUsersDto = {
                page: 1,
                limit: 10,
                username: 'testuser',
                email: null,
                status: 'Active',
                sort_field: 'username',
                sort_order: 'ascend',
            };

            const usersMock = [
                {
                    id: '1',
                    username: 'testuser',
                    email: 'test@test.com',
                    roles: { name: 'USER', permissions: [{ name: 'READ' }] },
                    active: true,
                },
            ];

            // Mocking the repository's query result
            (userRepository.createQueryBuilder().getManyAndCount as jest.Mock).mockResolvedValueOnce([usersMock, 1]);

            const result = await userService.findAll(filterUsersDto);

            expect(result).toEqual(
                new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, {
                    total: 1,
                    page: 1,
                    limit: 10,
                    users: [
                        {
                            id: '1',
                            username: 'testuser',
                            email: 'test@test.com',
                            roles: 'USER',
                            permissions: ['READ'],
                            status: 'Active',
                        },
                    ],
                }, [])
            );
        });

        it('should filter users by username', async () => {
            const filterUsersDto: FilterUsersDto = {
                page: 1,
                limit: 10,
                username: 'admin',
                email: null,
                status: null,
                sort_field: null,
                sort_order: null,
            };

            const usersMock = [
                {
                    id: '2',
                    username: 'admin',
                    email: 'admin@test.com',
                    roles: { name: 'ADMIN', permissions: [{ name: 'WRITE' }] },
                    active: true,
                },
            ];
            (userRepository.createQueryBuilder().getManyAndCount as jest.Mock).mockResolvedValueOnce([usersMock, 1]);

            const result = await userService.findAll(filterUsersDto);

            expect(result.data.users[0].username).toBe('admin');
        });
    });
});