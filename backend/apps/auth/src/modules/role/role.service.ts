import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { ResponseDto } from '../../common/dto/responseDto';
import { ResponseUnion } from '../../common/dto/responseUnion';
import { ResponseErrorDto } from '../../common/dto/responseError.dto';
import { RoleEntity } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<RoleEntity[]>();
    try {
      const roles = await this.roleRepository.find();
      response.setStatus(200);
      response.setMessage('Roles retrieved successfully');
      response.setData(roles);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('Roles retrieved Error');
      response.setError('asdas');
      return response;
    }
  }
  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<RoleEntity>();
    try {
      const item = await this.roleRepository.findOneBy({ id });
      response.setStatus(200);
      response.setMessage('role retrieved successfully');
      response.setData(item);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('role retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<RoleEntity>();
    try {
      const item = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(item);
      response.setStatus(200);
      response.setMessage('role retrieved successfully');
      response.setData(item);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('role retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<RoleEntity>();
    try {
      const roleResponse = await this.findOne(id);

      if (roleResponse instanceof ResponseErrorDto) {
        return roleResponse;
      }

      const role = roleResponse.data as RoleEntity;
      Object.assign(role, updateRoleDto);
      await this.roleRepository.save(role);
      response.setStatus(200);
      response.setMessage('role retrieved successfully');
      response.setData(role);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('role retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.roleRepository.delete(id);
      response.setStatus(200);
      response.setMessage('Delete Successfully');
      response.setData('');
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('role retrieved Error');
      response.setError('asdas');
      return response;
    }
  }
}
