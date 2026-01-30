import type { PaginationMeta, PaginationParams } from './types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

/**
 * Calculates pagination metadata
 *
 * @param page - Current page number (1-indexed)
 * @param limit - Items per page
 * @param total - Total number of items
 * @returns Pagination metadata object
 */
export function calculatePagination(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    total_pages: totalPages,
    has_next: page < totalPages,
    has_prev: page > 1,
  };
}

/**
 * Parses and validates pagination parameters from URL search params
 *
 * @param searchParams - URL search parameters
 * @returns Validated pagination parameters with defaults
 */
export function parsePaginationParams(
  searchParams: URLSearchParams
): PaginationParams {
  const page = Math.max(
    DEFAULT_PAGE,
    Number(searchParams.get('page')) || DEFAULT_PAGE
  );
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(searchParams.get('limit')) || DEFAULT_LIMIT)
  );

  return { page, limit };
}

/**
 * Calculates database offset from page number
 *
 * @param page - Current page number (1-indexed)
 * @param limit - Items per page
 * @returns Database offset value
 */
export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}
