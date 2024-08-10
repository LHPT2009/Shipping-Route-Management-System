import { ApolloError } from 'apollo-server-express';

export function typeOrmExceptionFactory(error: any): ApolloError {
  let errors = [];

  if (error.code === '23505') {
    // Error code for unique constraint violation in PostgreSQL
    // Find all matching pairs of (column name, value) that violate constraints
    const detailMatches = [
      ...error.detail.matchAll(/Key \(([^)]+)\)=\(([^)]+)\)/g),
    ];

    detailMatches.forEach((match) => {
      const field = match[1];
      const value = match[2];
      const message = `The value "${value}" already exists for the field "${field}".`;

      errors.push({
        field: field,
        errors: [message],
      });
    });
  } else {
    errors.push({
      field: 'unknown',
      errors: ['An unknown database error occurred.'],
    });
  }

  return new ApolloError('VALIDATION_ERROR', 'FAILURE', {
    errors: [
      {
        message: 'VALIDATION_ERROR',
        status: 400,
        errors: errors,
      },
    ],
    data: null,
  });
}
