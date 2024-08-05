import { Resolver, Query } from '@nestjs/graphql';
import { TransportsService } from './transports.service';
import { TransportEntity } from '../database/entities/transports.entity';

@Resolver(() => TransportEntity)
export class TransportsResolver {
  constructor(private transportsService: TransportsService) {}

  @Query(() => TransportEntity)
  async getTransports(): Promise<TransportEntity[]> {
    return this.transportsService.findAll();
  }
}
