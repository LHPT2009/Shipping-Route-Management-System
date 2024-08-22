import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { STATUS, STATUS_CODE } from "common/constants/status"

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) { }

  async findAll(): Promise<ResponseDto<PermissionEntity[]>> {
    try {
      const permissions = await this.permissionRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, permissions, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
  async findOne(id: string): Promise<ResponseDto<PermissionEntity>> {
    try {
      const permission = await this.permissionRepository.findOneBy({ id });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, permission, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<ResponseDto<PermissionEntity>> {
    try {
      const permission = this.permissionRepository.create(createPermissionDto);
      await this.permissionRepository.save(permission);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, permission, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<ResponseDto<PermissionEntity>> {
    try {
      const permissionResponse = await this.findOne(id);

      const permission = permissionResponse.data as PermissionEntity;
      Object.assign(permission, updatePermissionDto);
      await this.permissionRepository.save(permission);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, permission, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async remove(id: string): Promise<ResponseDto<PermissionEntity>> {
    try {
      await this.permissionRepository.delete(id);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
