import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { RoleEntity } from './entity/role.entity';
import { STATUS_CODE, STATUS } from 'common/constants/status';
import { PermissionRepository } from '../permission/permission.repository';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';

@Injectable()
export class RoleService {
  constructor(
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
    try {
      const item = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(item);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, item, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseDto<RoleEntity>> {
    try {
      const roleResponse = await this.findOne(id);
      const role = roleResponse.data as RoleEntity;
      Object.assign(role, updateRoleDto);
      await this.roleRepository.save(role);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, role, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);

    }
  }

  async remove(id: string): Promise<ResponseDto<RoleEntity>> {
    try {
      await this.roleRepository.delete(id);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async addPermissionToRole(input: PermissionToRoleDto): Promise<ResponseDto<RoleEntity>> {
    const role = await this.roleRepository.findOne({
      where: { id: input.roleId },
      relations: ['permissions'],
    });
    const permission = await this.permissionRepository.findOne({ where: { id: input.permissionId } });

    role.permissions.push(permission);
    this.roleRepository.save(role)
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, role, null);
  }

  async removePermissionFromRole(input: PermissionToRoleDto): Promise<ResponseDto<RoleEntity>> {
    const role = await this.roleRepository.findOne({
      where: { id: input.roleId },
      relations: ['permissions'],
    });

    role.permissions = role.permissions.filter(
      (permission) => permission.id != input.permissionId,
    );

    this.roleRepository.save(role)
    return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, role, null);

  }
}
