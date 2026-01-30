import { NextResponse } from 'next/server';
import type {
  ApiResponse,
  PaginationMeta,
  ValidationErrorDetail,
} from './types';
import { HTTP_STATUS } from './types';

/**
 * Standardized API response builder
 */
export class ApiResponseBuilder {
  /**
   * Creates a success response
   *
   * @template T - Type of response data
   * @param data - Response payload
   * @param message - Success message
   * @param statusCode - HTTP status code
   * @returns Next.js JSON response
   */
  static success<T>(
    data: T,
    message: string = 'Success',
    statusCode: number = HTTP_STATUS.OK
  ): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: statusCode }
    );
  }

  /**
   * Creates a created response for resource creation
   *
   * @template T - Type of created resource
   * @param data - Created resource data
   * @param message - Success message
   * @returns Next.js JSON response with 201 status
   */
  static created<T>(
    data: T,
    message: string = 'Resource created successfully'
  ): NextResponse<ApiResponse<T>> {
    return this.success(data, message, HTTP_STATUS.CREATED);
  }

  /**
   * Creates a paginated response
   *
   * @template T - Type of paginated items
   * @param data - Array of items
   * @param pagination - Pagination meta
   * @param message - Success message
   * @returns Next.js JSON response with pagination
   */
  static paginated<T>(
    data: T[],
    pagination: PaginationMeta,
    message: string = 'Success'
  ): NextResponse<ApiResponse<T[]>> {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
        meta: {
          pagination,
        },
      },
      { status: HTTP_STATUS.OK }
    );
  }

  /**
   * Creates an error response
   *
   * @param message - Error message
   * @param statusCode - HTTP status code
   * @param errors - Optional validation errors
   * @returns Next.js JSON error response
   */
  static error(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors?: ValidationErrorDetail[]
  ): NextResponse<ApiResponse<never>> {
    return NextResponse.json(
      {
        success: false,
        message,
        ...(errors && { errors }),
      },
      { status: statusCode }
    );
  }

  /**
   * Creates a validation error response
   *
   * @param errors - Array of validation errors
   * @param message - Error message
   * @returns Next.js JSON response with 422 status
   */
  static validationError(
    errors: ValidationErrorDetail[],
    message: string = 'Validation failed'
  ): NextResponse<ApiResponse<never>> {
    return this.error(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, errors);
  }

  /**
   * Creates a not found error response
   *
   * @param resource - Name of the resource not found
   * @returns Next.js JSON response with 404 status
   */
  static notFound(
    resource: string = 'Resource'
  ): NextResponse<ApiResponse<never>> {
    return this.error(`${resource} not found`, HTTP_STATUS.NOT_FOUND);
  }

  /**
   * Creates a bad request error response
   *
   * @param message - Error message
   * @returns Next.js JSON response with 400 status
   */
  static badRequest(
    message: string = 'Bad request'
  ): NextResponse<ApiResponse<never>> {
    return this.error(message, HTTP_STATUS.BAD_REQUEST);
  }
}
