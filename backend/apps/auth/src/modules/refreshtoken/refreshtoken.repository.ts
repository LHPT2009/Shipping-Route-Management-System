import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entity/refreshtoken.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        repository: Repository<RefreshTokenEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
