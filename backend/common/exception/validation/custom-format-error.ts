import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { BadRequestException } from '@nestjs/common';

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
  const defaultError: CustomGraphQLFormattedError = {
    message: 'Internal Server Error',
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
    },
  };

  if (error.extensions?.exception instanceof BadRequestException) {
    const response = error.extensions.exception.getResponse() as any;
    const validationErrors = response.errors
      ? Object.keys(response.errors).map((key) => ({
          field: key,
          errors: (response.errors[key] as string[]) || [], // Ép kiểu để đảm bảo là string[]
        }))
      : [];

    return {
      message: response.message || 'Validation failed',
      status: 400,
      errors: validationErrors,
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

  return defaultError;
};

export default CustomFormatError;
