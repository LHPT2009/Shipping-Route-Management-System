import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../database/entities/routes.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  async findAll(): Promise<Route[]> {
    const data = await this.routeRepository.find();
    return data;
  }
}
