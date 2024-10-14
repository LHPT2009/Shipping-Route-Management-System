import { Module } from '@nestjs/common';
import { ContactService,  } from './contact.service';
import { ContactEntity } from './entity/contact.entity';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactResolver } from './contact.resolver';
import { ContactRepository } from './contact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity]),
  ],
  providers: [ContactService, ContactResolver, ContactRepository, JwtService],
  exports: [ContactService, ContactRepository],
})
export class ContactModule { }
