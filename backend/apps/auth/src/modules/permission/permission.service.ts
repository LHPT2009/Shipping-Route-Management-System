import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from "../../../../../common/constants/status"

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

  async permissionStatistics(): Promise<ResponseDto<number>> {
    try {
      const totalPermissions = await this.permissionRepository.count();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalPermissions, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
