import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteEntity } from './entity/routes.entity';

@Injectable()
export class RouteRepository extends Repository<RouteEntity> {
  constructor(
    @InjectRepository(RouteEntity)
    repository: Repository<RouteEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
