import { Injectable } from '@nestjs/common';
import { TransportRepository } from './transports.repository';
import { Transport } from './type/transport.type';
import { CreateTransportDto } from './dto/transport-create.dto';
import { UpdateTransportDto } from './dto/transport-update.dto';
import { ResponseDto } from '../../common/dto/responseDto';
import { ResponseUnion } from '../../common/dto/ResponseUnion';
import { ResponseErrorDto } from '../../common/dto/responseError.dto';

@Injectable()
export class TransportsService {
  constructor(private transportRepository: TransportRepository) {}

  async findAll(): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Transport[]>();
    try {
      const transports = await this.transportRepository.find();
      response.setStatus(200);
      response.setMessage('transports retrieved successfully');
      response.setData(transports);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('transports retrieved Error');
      response.setError('asdas');
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
      response.setStatus(200);
      response.setMessage('transports retrieved successfully');
      response.setData(transport);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('transports retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async findOne(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto<Transport>();
    try {
      const transport = await this.transportRepository.findOneBy({ id });
      response.setStatus(200);
      response.setMessage('transport retrieved successfully');
      response.setData(transport);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('transport retrieved Error');
      response.setError('asdas');
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
      response.setStatus(200);
      response.setMessage('transports retrieved successfully');
      response.setData(transport);
      return response;
    } catch (error) {
      const response = new ResponseErrorDto();
      response.setStatus(400);
      response.setMessage('transports retrieved Error');
      response.setError('asdas');
      return response;
    }
  }

  async remove(id: string): Promise<typeof ResponseUnion> {
    const response = new ResponseDto();
    try {
      await this.transportRepository.delete(id);
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
