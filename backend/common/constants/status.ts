export enum STATUS {
    SUCCESS = 'SUCCESS',
    CREATE = 'CREATE',
    FAILURE = 'FAILURE',
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    SERVER_ERROR = 'SERVER_ERROR',
}

export enum STATUS_CODE {
    SUCCESS = 200,
    CREATE = 201,
    FAILURE = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    VALIDATION_ERROR = 422,
    SERVER_ERROR = 500,
}

export enum ERROR {
    INVALID_INPUT = 'Invalid input provided.',
    USER_NOT_FOUND = 'User not found.',
    AUTHENTICATION_FAILED = 'Authentication failed.',
    ACCESS_DENIED = 'Access denied.',
    RESOURCE_NOT_FOUND = 'The requested resource was not found.',
    DUPLICATE_ENTRY = 'Duplicate entry found.',
    INTERNAL_SERVER_ERROR = 'Internal server error occurred.',
    DATABASE_ERROR = 'A database error occurred.',
    NETWORK_ERROR = 'Network error. Please try again.',
    TIMEOUT_ERROR = 'Request timed out. Please try again.',
    PERMISSION_DENIED = 'Permission denied.',
    VALIDATION_FAILED = 'Data validation failed.',
}
