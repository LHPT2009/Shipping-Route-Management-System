import { createUnionType } from '@nestjs/graphql';
import { ResponseDto } from './responseDto';
import { ResponseErrorDto } from './responseError.dto';

export const ResponseUnion = createUnionType({
  name: 'ResponseUnion',
  types: () => [ResponseDto, ResponseErrorDto] as const,
  resolveType(value) {
    if (value.error) {
      return ResponseErrorDto;
    }
    return ResponseDto;
  },
});
