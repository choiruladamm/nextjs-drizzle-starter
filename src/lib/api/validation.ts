import { ZodError, type ZodSchema, type ZodIssue } from 'zod';
import type { ValidationErrorDetail } from './types';

/**
 * Safe parse result discriminated union
 */
export type SafeParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: ValidationErrorDetail[] };

/**
 * Validates data against a Zod schema using safeParse
 *
 * @template T - Inferred type from schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Discriminated union with success status and data or errors
 */
export function validateSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): SafeParseResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    error: formatZodErrors(result.error),
  };
}

/**
 * Formats ZodError into standardized validation error details
 *
 * @param error - ZodError instance
 * @returns Array of formatted validation errors
 */
export function formatZodErrors(error: ZodError): ValidationErrorDetail[] {
  return error.issues.map((issue: ZodIssue) => ({
    field: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }));
}

/**
 * Validates data and throws formatted validation errors if invalid
 *
 * @template T - Inferred type from schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated and typed data
 * @throws {Error} Formatted validation errors
 */
export function parseSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = validateSchema(schema, data);

  if (!result.success) {
    const errorMessage = result.error
      .map((err) => `${err.field}: ${err.message}`)
      .join(', ');
    throw new Error(`Validation failed: ${errorMessage}`);
  }

  return result.data;
}

/**
 * Async version of validateSchema for schemas with async refinements
 *
 * @template T - Inferred type from schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Promise of discriminated union with success status and data or errors
 */
export async function validateSchemaAsync<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<SafeParseResult<T>> {
  const result = await schema.safeParseAsync(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    error: formatZodErrors(result.error),
  };
}
