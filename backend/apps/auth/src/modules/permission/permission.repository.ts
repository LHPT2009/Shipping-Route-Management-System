import { Repository } from 'typeorm';
import { PermissionEntity } from './entity/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionRepository extends Repository<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    repository: Repository<PermissionEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
