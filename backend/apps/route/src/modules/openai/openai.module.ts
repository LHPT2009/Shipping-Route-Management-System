import { OpenaiService } from './openai.service';
import { OpenaiResolver } from './openai.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [OpenaiService, OpenaiResolver]
})
export class OpenaiModule { }
