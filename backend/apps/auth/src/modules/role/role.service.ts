import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { RoleEntity } from './entity/role.entity';
import { STATUS_CODE, STATUS } from 'common/constants/status';
import { PermissionRepository } from '../permission/permission.repository';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';
import { In } from 'typeorm';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class RoleService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository
  ) { }

  async findAll(): Promise<ResponseDto<RoleEntity[]>> {
    try {
      const roles = await this.roleRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, roles, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
  async findOne(id: string): Promise<ResponseDto<RoleEntity>> {
    try {
      const item = await this.roleRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, item, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<ResponseDto<RoleEntity>> {
    const { name } = createRoleDto;

    const existingRole = await this.roleRepository.findOne({ where: { name: name } });

    if (existingRole) {
      throw new CustomValidationError(STATUS.ERR_VALIDATION, { name: ['Name already exists'] });
    }

    const item = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(item);
    return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, item, []);
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseDto<RoleEntity>> {
    const { name } = updateRoleDto;

    const existingRole = await this.roleRepository.findOne({ where: { name: name } });

    if (existingRole) {
      throw new CustomValidationError(STATUS.ERR_VALIDATION, { name: ['Name already exists'] });
    }

    const roleResponse = await this.findOne(id);
    const role = roleResponse.data as RoleEntity;
    Object.assign(role, updateRoleDto);
    await this.roleRepository.save(role);
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, role, []);
  }

  async remove(id: string): Promise<ResponseDto<RoleEntity>> {
    const usersWithRole = await this.userRepository.find({
      where: { roles: { id } },
    });
    if (usersWithRole.length > 0) {
      throw new CustomValidationError(
        STATUS.ERR_VALIDATION, {
        name: [
          'Role is associated with one or more users and cannot be deleted']
      }
      );
    }

    const roleWithPermissions = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (roleWithPermissions?.permissions.length > 0) {
      throw new CustomValidationError(
        STATUS.ERR_VALIDATION, {
        name: [
          'Role is associated with one or more permissions and cannot be deleted']
      }
      );
    }

    await this.roleRepository.delete(id);
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
  }

  async addPermissionToRole(input: PermissionToRoleDto): Promise<ResponseDto<RoleEntity>> {
    const { roleId, permissionIds } = input;

    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });

    if (!role) {
      return new ResponseDto(STATUS_CODE.ERR_NOT_FOUND, STATUS.ERR_NOT_FOUND, null, { message: `Role with ID ${roleId} not found` });
    }

    const permissions = await this.permissionRepository.findBy({ id: In(permissionIds) });

    if (permissions.length !== permissionIds.length) {
      return new ResponseDto(STATUS_CODE.ERR_NOT_FOUND, STATUS.ERR_NOT_FOUND, null, { message: `Some permissions were not found` });
    }

    role.permissions = permissions;

    await this.roleRepository.save(role);

    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, role, null);
  }

  async roleStatistics(): Promise<ResponseDto<number>> {
    try {
      const totalRoles = await this.roleRepository.count();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalRoles, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
