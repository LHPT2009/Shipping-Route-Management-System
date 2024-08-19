import { Resolver, Query, Context } from '@nestjs/graphql';
import { ResponseDto } from 'common/response/responseDto';
import { RefreshTokenService } from './refreshtoken.service';
import { RefreshToken } from './type/refreshtoken.type';

@Resolver(() => RefreshToken)
export class RefreshTokenResolver {
    constructor(private refreshTokenService: RefreshTokenService) { }

    @Query(() => ResponseDto<{}>)
    async getRefreshAccessToken(@Context() context: any): Promise<ResponseDto<{}>> {
        return this.refreshTokenService.refreshAccessToken(context);
    }
}
