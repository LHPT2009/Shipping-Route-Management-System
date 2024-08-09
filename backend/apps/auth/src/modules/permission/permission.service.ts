import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { ResponseUnion } from 'common/response/responseUnion';
import { ResponseErrorDto } from 'common/response/responseError.dto';
import { STATUS, STATUS_CODE } from "common/constants/status"

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) { }

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<PermissionEntity[]>();
    try {
      const permissions = await this.permissionRepository.find();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(permissions);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }
  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<PermissionEntity>();
    try {
      const permission = await this.permissionRepository.findOneBy({ id });
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<PermissionEntity>();
    try {
      const permission = this.permissionRepository.create(createPermissionDto);
      await this.permissionRepository.save(permission);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<PermissionEntity>();
    try {
      const permissionResponse = await this.findOne(id);

      if (permissionResponse instanceof ResponseErrorDto) {
        return permissionResponse;
      }

      const permission = permissionResponse.data as PermissionEntity;
      Object.assign(permission, updatePermissionDto);
      await this.permissionRepository.save(permission);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.permissionRepository.delete(id);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData('');
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }
}
