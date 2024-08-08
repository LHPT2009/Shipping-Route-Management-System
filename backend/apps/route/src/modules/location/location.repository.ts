import { Repository } from 'typeorm';
import { LocationEntity } from './entity/locations.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationRepository extends Repository<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    repository: Repository<LocationEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  //   async findByName(name: string): Promise<Location | undefined> {
  //     return await this.findOne({ where: { name } });
  //   }
}
