import { OpenaiService } from './openai.service';
import { OpenaiResolver } from './openai.resolver';
import { forwardRef, Module } from '@nestjs/common';
import { RouteModule } from '../route/route.module';

@Module({
  imports: [
    forwardRef(() => RouteModule),
  ],
  providers: [OpenaiService, OpenaiResolver]
})
export class OpenaiModule { }
