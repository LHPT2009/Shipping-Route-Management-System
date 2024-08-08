import { Injectable } from '@nestjs/common';
import { TransportRepository } from './transport.repository';
import { Transport } from './type/transport.type';
import { CreateTransportDto } from './dto/transport-create.dto';
import { UpdateTransportDto } from './dto/transport-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { ResponseUnion } from '../../../../../common/response/responseUnion';
import { ResponseErrorDto } from '../../../../../common/response/responseError.dto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

@Injectable()
export class TransportsService {
  constructor(private transportRepository: TransportRepository) { }

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Transport[]>();
    try {
      const transports = await this.transportRepository.find();
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(transports);
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
    createTransportDto: CreateTransportDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Transport>();
    try {
      const transport = this.transportRepository.create(createTransportDto);
      await this.transportRepository.save(transport);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(transport);
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
    const response = new ResponseDto<Transport>();
    try {
      const transport = await this.transportRepository.findOneBy({ id });
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(transport);
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
    updateTransportDto: UpdateTransportDto,
  ): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Transport>();
    try {
      const routeResponse = await this.findOne(id);

      if (routeResponse instanceof ResponseErrorDto) {
        return routeResponse;
      }

      const transport = routeResponse.data as Transport;
      Object.assign(transport, updateTransportDto);
      await this.transportRepository.save(transport);
      response.setStatus(STATUS_CODE.SUCCESS);
      response.setMessage(STATUS.SUCCESS);
      response.setData(transport);
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
      await this.transportRepository.delete(id);
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
