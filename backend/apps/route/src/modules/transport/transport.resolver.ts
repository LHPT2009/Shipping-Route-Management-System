import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { TransportsService } from './transport.service';
import { Transport } from './type/transport.type';
import { CreateTransportDto } from './dto/transport-create.dto';
import { UpdateTransportDto } from './dto/transport-update.dto';
import { UseGuards } from '@nestjs/common';
import { ResponseDto } from 'common/response/responseDto';
import { AuthGuard } from 'common/exception/guards/auth.guard';

@Resolver(() => Transport)
export class TransportsResolver {
  constructor(private transportsService: TransportsService) { }

  @Query(() => ResponseDto<Transport[]>)
  @UseGuards(AuthGuard)
  async getTransports(): Promise<ResponseDto<Transport[]>> {
    return this.transportsService.findAll();
  }

  @Query(() => ResponseDto<Transport>, { nullable: true })
  async getTransport(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Transport>> {
    return this.transportsService.findOne(id);
  }

  @Mutation(() => ResponseDto<Transport>)
  async createTransport(
    @Args('input') input: CreateTransportDto,
  ): Promise<ResponseDto<Transport>> {
    return this.transportsService.create(input);
  }

  @Mutation(() => ResponseDto<Transport>)
  async updateTransport(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateTransportDto,
  ): Promise<ResponseDto<Transport>> {
    return this.transportsService.update(id, input);
  }

  @Mutation(() => ResponseDto<Transport>)
  async removeTransport(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ResponseDto<Transport>> {
    return this.transportsService.remove(id);
  }
}
