import { z } from '@/lib/zod';

/**
 * Validation schema for creating a new user
 */
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .optional(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
});

/**
 * Validation schema for updating an existing user
 */
export const updateUserSchema = createUserSchema.partial();

/**
 * Validation schema for pagination query parameters
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

/**
 * Data transfer object for creating a user
 */
export type CreateUserDTO = z.infer<typeof createUserSchema>;

/**
 * Data transfer object for updating a user
 */
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

/**
 * Data transfer object for pagination query
 */
export type PaginationQueryDTO = z.infer<typeof paginationQuerySchema>;
