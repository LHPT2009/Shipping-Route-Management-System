import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/role-create.dto';
import { UpdateRoleDto } from './dto/role-update.dto';
import { ResponseDto } from 'common/response/responseDto';
import { ResponseUnion } from 'common/response/responseUnion';
import { ResponseErrorDto } from 'common/response/responseError.dto';
import { RoleEntity } from './entity/role.entity';
import { STATUS_CODE, STATUS } from 'common/constants/status';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) { }

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<RoleEntity[]>();
    try {
      const roles = await this.roleRepository.find();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(roles);
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
    const response = new ResponseDto<RoleEntity>();
    try {
      const item = await this.roleRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(item);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(STATUS_CODE.SERVER_ERROR);
      response.setMessage("");
      response.setError(STATUS.SERVER_ERROR);
      return response;
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<RoleEntity>();
    try {
      const item = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(item);
      response.setStatus(STATUS_CODE.CREATE);
      response.setMessage(STATUS.CREATE);
      response.setData(item);
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
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(role);
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
      await this.roleRepository.delete(id);
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
