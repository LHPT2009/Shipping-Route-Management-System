import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transport } from '../database/entities/transports.entity';

@Injectable()
export class TransportsService {
  constructor(
    @InjectRepository(Transport)
    private transportRepository: Repository<Transport>,
  ) {}

  async findAll(): Promise<Transport[]> {
    const data = await this.transportRepository.find();
    return data;
  }
}
