/**
 * Shared type definitions for API layer
 */

/**
 * Standard API response wrapper
 *
 * @template T - Type of the data payload
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    pagination?: PaginationMeta;
  };
  errors?: ValidationErrorDetail[];
};

/**
 * Pagination query parameters
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * Pagination metadata in response
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

/**
 * Validation error detail structure
 */
export type ValidationErrorDetail = {
  field: string;
  message: string;
  code?: string;
};

/**
 * HTTP status codes used in API
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * API error codes
 */
export const ERROR_CODES = {
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
