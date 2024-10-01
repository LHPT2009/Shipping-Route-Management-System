import { Resolver, Query } from '@nestjs/graphql';
import { TransportsService } from './transport.service';
import { Transport } from './type/transport.type';
import { UseGuards } from '@nestjs/common';
import { ResponseDto } from '../../../../../common/response/responseDto';
import { AuthGuard } from '../../../../../common/exception/guards/auth.guard';
import { RoleGuard } from '../../../../../common/exception/guards/role.guard';
import { Roles } from '../../../../../common/exception/guards/decorator/roles.decorator';
import { Permissions } from '../../../../../common/exception/guards/decorator/permissions.decorator';
import { ROLE } from '../../../../../common/constants/role';
import { PERMISSION } from '../../../../../common/constants/permission';

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

  @Roles(ROLE.ADMIN)
  @Permissions(PERMISSION.READ_LIST_TRANSPORT)
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => ResponseDto<number>)
  async transportStatistics(): Promise<ResponseDto<number>> {
    return this.transportsService.transportStatistics();
  }
}
