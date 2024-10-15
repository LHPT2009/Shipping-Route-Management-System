import { OpenaiService } from './openai.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
  ],
  providers: [OpenaiService]
})
export class OpenaiModule { }
