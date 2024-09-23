import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { TransportsService } from './transport.service';
import { Transport } from './type/transport.type';
import { CreateTransportDto } from './dto/transport-create.dto';
import { UpdateTransportDto } from './dto/transport-update.dto';
import { UseGuards } from '@nestjs/common';
import { ResponseDto } from 'common/response/responseDto';
import { AuthGuard } from 'common/exception/guards/auth.guard';
import { RoleGuard } from 'common/exception/guards/role.guard';
import { Roles } from 'common/exception/guards/decorator/roles.decorator';
import { Permissions } from 'common/exception/guards/decorator/permissions.decorator';
import { ROLE } from 'common/constants/role';
import { PERMISSION } from 'common/constants/permission';

@Resolver(() => Transport)
export class TransportsResolver {
  constructor(private transportsService: TransportsService) { }

  @Query(() => ResponseDto<Transport[]>)
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_TRANSPORT)
  @UseGuards(AuthGuard, RoleGuard)
  async getTransports(): Promise<ResponseDto<Transport[]>> {
    return this.transportsService.findAll();
  }

  @Query(() => ResponseDto<Transport>, { nullable: true })
  @Roles(ROLE.CUSTOMER, ROLE.ADMIN)
  @Permissions(PERMISSION.READ_DETAIL_TRANSPORT)
  @UseGuards(AuthGuard, RoleGuard)
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

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_TRANSPORT)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<number>)
  async transportStatistics(): Promise<ResponseDto<number>> {
    return this.transportsService.transportStatistics();
  }
}
