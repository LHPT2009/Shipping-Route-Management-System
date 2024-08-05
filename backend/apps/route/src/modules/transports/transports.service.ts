import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportEntity } from '../database/entities/transports.entity';

@Injectable()
export class TransportsService {
  constructor(
    @InjectRepository(TransportEntity)
    private transportRepository: Repository<TransportEntity>,
  ) {}

  async findAll(): Promise<TransportEntity[]> {
    const data = await this.transportRepository.find();
    return data;
  }
}
