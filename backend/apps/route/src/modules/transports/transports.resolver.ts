import { Resolver, Query } from '@nestjs/graphql';
import { TransportsService } from './transports.service';
import { Transport } from '../database/entities/transports.entity';

@Resolver(() => Transport)
export class TransportsResolver {
  constructor(private transportsService: TransportsService) {}

  @Query(() => Transport)
  async getTransports(): Promise<Transport[]> {
    return this.transportsService.findAll();
  }
}
