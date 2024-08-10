import { GraphQLError, GraphQLFormattedError } from 'graphql';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

interface ValidationErrorDetail {
  field: string;
  errors: string[];
}

interface CustomGraphQLFormattedError extends GraphQLFormattedError {
  status?: number;
  errors?: ValidationErrorDetail[];
}

const CustomFormatError = (
  error: GraphQLError,
): CustomGraphQLFormattedError => {
  if (error.extensions?.exception instanceof BadRequestException) {
    const response = error.extensions.exception.getResponse() as any;
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

  if (error.extensions?.exception instanceof InternalServerErrorException) {
    return {
      message: 'Internal server error',
      status: 500,
      errors: [],
    };
  }

  if (error.extensions?.originalError) {
    const originalError = error.extensions.originalError as any;

    return {
      message: originalError.message || error.message,
      status: originalError.statusCode || 500,
      errors: originalError.errors || [],
    };
  }

  return error;
};

export default CustomFormatError;
