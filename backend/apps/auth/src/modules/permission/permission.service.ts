import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { PermissionEntity } from './entity/permission.entity';
import { CreatePermissionDto } from './dto/permission-create.dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';
import { ResponseDto } from '../../common/dto/responseDto';
import { ResponseUnion } from '../../common/dto/responseUnion';
import { ResponseErrorDto } from '../../common/dto/responseError.dto';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<PermissionEntity[]>();
    try {
      const permissions = await this.permissionRepository.find();
      response.setStatus(200);
      response.setMessage('permissions retrieved successfully');
      response.setData(permissions);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Permissions retrieved Error');
      response.setError('asdas');
      return response;
    }
  }
  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<PermissionEntity>();
    try {
      const permission = await this.permissionRepository.findOneBy({ id });
      response.setStatus(200);
      response.setMessage('permission retrieved successfully');
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('permission retrieved Error');
      response.setError('asdas');
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
      response.setStatus(200);
      response.setMessage('Permissions retrieved successfully');
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Permissions retrieved Error');
      response.setError('asdas');
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
      response.setStatus(200);
      response.setMessage('Permissions retrieved successfully');
      response.setData(permission);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Permissions retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.permissionRepository.delete(id);
      response.setStatus(200);
      response.setMessage('Delete Successfully');
      response.setData('');
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Locations retrieved Error');
      response.setError('asdas');
      return response;
    }
  }
}
