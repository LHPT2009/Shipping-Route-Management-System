import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesResolver } from './routes.resolver';
import { DatabaseModule } from '../database/database.module';
import { MessageStore } from './messages.store';
// import { KafkaModule } from '../../kafka.module';
// import { RouteController } from './routes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [RoutesService, RoutesResolver, MessageStore],
  exports: [RoutesService],
})
export class RoutesModule {}
