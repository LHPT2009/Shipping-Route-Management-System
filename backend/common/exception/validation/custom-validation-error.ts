import { GraphQLError } from 'graphql';

export class CustomValidationError extends GraphQLError {
  constructor(message: string, validationErrors: Record<string, string[]>) {
    const formattedErrors = Object.keys(validationErrors).map((key) => ({
      field: key,
      errors: validationErrors[key] || [],
    }));

    super('VALIDATION_ERROR', {
      extensions: {
        response: {
          errors: [
            {
              status: 400,
              message: message,
              data: [],
              error: formattedErrors,
            },
          ],
        },
      },
    });
  }
}

