import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesResolver } from './routes.resolver';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RoutesService, RoutesResolver],
  exports: [RoutesService],
})
export class RoutesModule {}
