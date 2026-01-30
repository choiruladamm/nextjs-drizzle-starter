import { z } from '@/lib/zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .optional(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
});

export const updateUserSchema = createUserSchema.partial();

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export type PaginationQueryDTO = z.infer<typeof paginationQuerySchema>;
