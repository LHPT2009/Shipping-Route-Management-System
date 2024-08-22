import { Injectable } from '@nestjs/common';
import { TransportRepository } from './transport.repository';
import { Transport } from './type/transport.type';
import { CreateTransportDto } from './dto/transport-create.dto';
import { UpdateTransportDto } from './dto/transport-update.dto';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from 'common/constants/status';

@Injectable()
export class TransportsService {
  constructor(private transportRepository: TransportRepository) { }

  async findAll(): Promise<ResponseDto<Transport[]>> {
    try {
      const transports = await this.transportRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, transports, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async create(
    createTransportDto: CreateTransportDto,
  ): Promise<ResponseDto<Transport>> {
    try {
      const transport = this.transportRepository.create(createTransportDto);
      await this.transportRepository.save(transport);
      return new ResponseDto(STATUS_CODE.CREATE, STATUS.CREATE, transport, []);

    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async findOne(id: string): Promise<ResponseDto<Transport>> {
    try {
      const transport = await this.transportRepository.findOneBy({ id });
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, transport, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async update(
    id: string,
    updateTransportDto: UpdateTransportDto,
  ): Promise<ResponseDto<Transport>> {
    try {
      const routeResponse = await this.findOne(id);

      const transport = routeResponse.data as Transport;
      Object.assign(transport, updateTransportDto);
      await this.transportRepository.save(transport);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, transport, []);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }

  async remove(id: string): Promise<ResponseDto<Transport>> {
    try {
      await this.transportRepository.delete(id);
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, null, null);
    } catch (error) {
      return new ResponseDto(STATUS_CODE.ERR_INTERNAL_SERVER, STATUS.ERR_INTERNAL_SERVER, null, null);
    }
  }
}
