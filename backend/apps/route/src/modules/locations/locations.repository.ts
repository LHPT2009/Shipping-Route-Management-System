import { Repository } from 'typeorm';
import { Location } from '../database/entities/locations.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationRepository extends Repository<Location> {
  constructor(
    @InjectRepository(Location)
    repository: Repository<Location>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  //   async findByName(name: string): Promise<Location | undefined> {
  //     return await this.findOne({ where: { name } });
  //   }
}
