import { ERROR_CODES, HTTP_STATUS, type ErrorCode } from './types';

/**
 * Base application error class with status code and error code
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    public errorCode: ErrorCode = ERROR_CODES.INTERNAL_ERROR
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error for request data
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(
      message,
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      ERROR_CODES.VALIDATION_ERROR
    );
  }
}

/**
 * Resource not found error
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(
      `${resource} not found`,
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.NOT_FOUND
    );
  }
}

/**
 * Database operation error
 */
export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.DATABASE_ERROR
    );
  }
}

/**
 * Bad request error
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request') {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.BAD_REQUEST);
  }
}
