import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './entity/contact.entity';

@Injectable()
export class ContactRepository extends Repository<ContactEntity> {
  constructor(
    @InjectRepository(ContactEntity)
    repository: Repository<ContactEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
