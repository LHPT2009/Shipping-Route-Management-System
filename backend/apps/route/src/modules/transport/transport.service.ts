import { Injectable } from '@nestjs/common';
import { TransportRepository } from './transport.repository';
import { Transport } from './type/transport.type';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { STATUS, STATUS_CODE } from '../../../../../common/constants/status';
import { CustomValidationError } from '../../../../../common/exception/validation/custom-validation-error';

@Injectable()
export class TransportsService {
  constructor(private transportRepository: TransportRepository) { }

  async findAll(): Promise<ResponseDto<Transport[]>> {
    try {
      const transports = await this.transportRepository.find();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, transports, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { transport: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }

  async transportStatistics(): Promise<ResponseDto<any>> {
    try {
      const totalTransports = await this.transportRepository.count();
      return new ResponseDto(STATUS_CODE.SUCCESS, STATUS.SUCCESS, totalTransports, []);
    } catch (error) {
      throw new CustomValidationError(STATUS.ERR_INTERNAL_SERVER, { transport: [STATUS.ERR_INTERNAL_SERVER] });
    }
  }
}
