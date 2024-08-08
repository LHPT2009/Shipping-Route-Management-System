import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { TransportsService } from './transport.service';
import { Transport } from './type/transport.type';
import { CreateTransportDto } from './dto/transport-create.dto';
import { UpdateTransportDto } from './dto/transport-update.dto';
import { ResponseUnion } from '../../../../../common/response/responseUnion';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { PermissionGuard } from '../../../../../common/exception/guards/permission.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Transport)
export class TransportsResolver {
  constructor(private transportsService: TransportsService) { }

  @Query(() => ResponseUnion)
  async getTransports(): Promise<typeof ResponseUnion> {
    return this.transportsService.findAll();
  }

  @Query(() => ResponseUnion, { nullable: true })
  @UseGuards(AuthGuard, new PermissionGuard(['admin']))
  async getTransport(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.transportsService.findOne(id);
  }

  @Mutation(() => ResponseUnion)
  async createTransport(
    @Args('createTransportDto') createTransportDto: CreateTransportDto,
  ): Promise<typeof ResponseUnion> {
    return this.transportsService.create(createTransportDto);
  }

  @Mutation(() => ResponseUnion)
  async updateTransport(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTransportDto') updateTransportDto: UpdateTransportDto,
  ): Promise<typeof ResponseUnion> {
    return this.transportsService.update(id, updateTransportDto);
  }

  @Mutation(() => ResponseUnion)
  async removeTransport(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof ResponseUnion> {
    return this.transportsService.remove(id);
  }
}
