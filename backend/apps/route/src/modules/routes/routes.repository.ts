import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../database/entities/routes.entity';

@Injectable()
export class RouteRepository extends Repository<Route> {
  constructor(
    @InjectRepository(Route)
    repository: Repository<Route>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
