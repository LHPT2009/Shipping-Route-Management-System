import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiResolver } from './openai.resolver';

@Module({
  providers: [OpenaiService, OpenaiResolver]
})
export class OpenaiModule { }
