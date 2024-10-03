import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { UserEntity } from './entity/user.entity';
import { FilterUsersDto } from './dto/user-filter.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserUpdateRoleDto } from './dto/user-update-role';
import { UpdateStatusUserDto } from './dto/user-update-status';
import { JwtService } from '@nestjs/jwt';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findInfoByID: jest.fn(),
    findInfoByToken: jest.fn(),
    updateUserByToken: jest.fn(),
    changePassword: jest.fn(),
    updateRoleForUser: jest.fn(),
    updateStatusUser: jest.fn(),
    remove: jest.fn(),
    userStatistics: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const input: FilterUsersDto = {
        page: 1,
        limit: 10,
        username: 'testuser',
        email: 'test@example.com',
        role: 'ADMIN',
        permission: 'VIEW_USERS',
        status: 'ACTIVE',
        sort_field: 'email',
        sort_order: 'ASC',
      };

      const users: UserEntity[] = [{ id: '1', email: 'test@example.com' }] as UserEntity[];
      const response = new ResponseDto(200, 'SUCCESS', { users, total: 1, page: 1, limit: 10 }, null);

      mockUserService.findAll.mockResolvedValue(response);

      const result = await userResolver.getUsers(input);
      expect(result).toEqual(response);
      expect(userService.findAll).toHaveBeenCalledWith(input);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const userId = '1';
      const user: UserEntity = { id: userId, email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.findInfoByID.mockResolvedValue(response);

      const result = await userResolver.getUserById(userId);
      expect(result).toEqual(response);
      expect(userService.findInfoByID).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUserByToken', () => {
    it('should return user by token', async () => {
      const context = {};
      const user: UserEntity = { id: '1', email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.findInfoByToken.mockResolvedValue(response);

      const result = await userResolver.getUserByToken(context);
      expect(result).toEqual(response);
      expect(userService.findInfoByToken).toHaveBeenCalledWith(context);
    });
  });

  describe('updateUserByToken', () => {
    it('should update user by token', async () => {
      const context = {};
      const input: UserUpdateDto = {};
      const user: UserEntity = { id: '1', email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.updateUserByToken.mockResolvedValue(response);

      const result = await userResolver.updateUserByToken(context, input);
      expect(result).toEqual(response);
      expect(userService.updateUserByToken).toHaveBeenCalledWith(context, input);
    });
  });

  describe('changePassword', () => {
    it('should change user password', async () => {
      const context = {};
      const input: ChangePasswordDto = {
        currentPassword: 'oldPassword123',
        newPassword: 'newPassword123',
        passwordConfirm: 'newPassword123',
      };
      const user: UserEntity = { id: '1', email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.changePassword.mockResolvedValue(response);

      const result = await userResolver.changePassword(context, input);
      expect(result).toEqual(response);
      expect(userService.changePassword).toHaveBeenCalledWith(context, input);
    });
  });

  describe('updateRoleForUser', () => {
    it('should update role for user', async () => {
      const userId = '1';
      const input: UserUpdateRoleDto = { roles: 'ADMIN' };
      const user: UserEntity = { id: userId, email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.updateRoleForUser.mockResolvedValue(response);

      const result = await userResolver.updateRoleForUser(userId, input);
      expect(result).toEqual(response);
      expect(userService.updateRoleForUser).toHaveBeenCalledWith(userId, input);
    });
  });

  describe('updateStatusUser', () => {
    it('should update status for user', async () => {
      const userId = '1';
      const input: UpdateStatusUserDto = { active: true };
      const user: UserEntity = { id: userId, email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.updateStatusUser.mockResolvedValue(response);

      const result = await userResolver.updateStatusUser(userId, input);
      expect(result).toEqual(response);
      expect(userService.updateStatusUser).toHaveBeenCalledWith(userId, input);
    });
  });

  describe('removeUser', () => {
    it('should remove a user by id', async () => {
      const userId = '1';
      const user: UserEntity = { id: userId, email: 'test@example.com' } as UserEntity;
      const response = new ResponseDto(200, 'SUCCESS', user, null);

      mockUserService.remove.mockResolvedValue(response);

      const result = await userResolver.removeUser(userId);
      expect(result).toEqual(response);
      expect(userService.remove).toHaveBeenCalledWith(userId);
    });
  });

  describe('userStatistics', () => {
    it('should return user statistics', async () => {
      const response = new ResponseDto(200, 'SUCCESS', 10, null);
      mockUserService.userStatistics.mockResolvedValue(response);

      const result = await userResolver.userStatistics();
      expect(result).toEqual(response);
      expect(userService.userStatistics).toHaveBeenCalled();
    });
  });
});