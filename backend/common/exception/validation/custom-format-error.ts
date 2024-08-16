import { GraphQLError, GraphQLFormattedError } from 'graphql';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResponseDto } from 'common/response/responseDto';

interface CustomGraphQLFormattedError extends GraphQLFormattedError {
  status?: number;
  errors?: ValidationErrorDetail[];
}

interface ValidationErrorDetail {
  field: string;
  errors: string[];
}

const CustomFormatError = (
  error: GraphQLError,
): CustomGraphQLFormattedError => {

  if (error.extensions?.exception instanceof BadRequestException) {
    const response = error.extensions.exception.getResponse() as any;
    console.log(response);
    const validationErrors = response.errors
      ? Object.keys(response.errors).map((key) => ({
        field: key,
        errors: (response.errors[key] as string[]) || [],
      }))
      : [];

    return {
      message: response.message || 'Validation failed',
      status: 400,
      errors: validationErrors,
    };
  }

  // if (error.extensions?.exception instanceof InternalServerErrorException) {
  //   return new ResponseDto(STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, [], [])
  // }

  if (error.extensions?.originalError) {
    const originalError = error.extensions.originalError as any;
    return new ResponseDto(originalError.statusCode, originalError.message || error.message, [], originalError.errors || [])
  }

  return (error.extensions.response as CustomGraphQLFormattedError).errors[0] as any;

};

export default CustomFormatError;
