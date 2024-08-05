import { Repository } from 'typeorm';
import { TransportEntity } from '../database/entities/transports.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransportRepository extends Repository<TransportEntity> {
  constructor(
    @InjectRepository(TransportEntity)
    repository: Repository<TransportEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  //   async findByName(name: string): Promise<Location | undefined> {
  //     return await this.findOne({ where: { name } });
  //   }
}
