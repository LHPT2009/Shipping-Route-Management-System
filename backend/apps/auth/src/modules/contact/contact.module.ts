import { forwardRef, Module } from '@nestjs/common';
import { ContactService, } from './contact.service';
import { ContactEntity } from './entity/contact.entity';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactResolver } from './contact.resolver';
import { ContactRepository } from './contact.repository';
import { OpenaiService } from '../openai/openai.service';
import { KafkaModule } from '../kafka/kafka.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity]),
    KafkaModule,
    UserModule,
  ],
  providers: [ContactService, ContactResolver, ContactRepository, JwtService, OpenaiService],
  exports: [ContactService, ContactRepository],
})
export class ContactModule { }
