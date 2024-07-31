import { Repository } from 'typeorm';
import { Transport } from '../database/entities/transports.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransportRepository extends Repository<Transport> {
  constructor(
    @InjectRepository(Transport)
    repository: Repository<Transport>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  //   async findByName(name: string): Promise<Location | undefined> {
  //     return await this.findOne({ where: { name } });
  //   }
}
