import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from '@/lib/zod';
import { HTTP_STATUS } from '@/lib/api/types';
import {
  createUserSchema,
  updateUserSchema,
  paginationQuerySchema,
} from './dto/user-dto';

export function registerUserDocs(registry: OpenAPIRegistry) {
  // Register Schemas
  registry.register(
    'User',
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      created_at: z.string().datetime(),
    })
  );

  registry.register('CreateUser', createUserSchema);
  registry.register('UpdateUser', updateUserSchema);

  // Register Paths
  registry.registerPath({
    method: 'get',
    path: '/api/users',
    summary: 'List users',
    request: {
      query: paginationQuerySchema,
    },
    responses: {
      [HTTP_STATUS.OK]: {
        description: 'List of users',
        content: {
          'application/json': {
            schema: z.object({
              success: z.boolean(),
              data: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  email: z.string(),
                  created_at: z.string(),
                })
              ),
              meta: z.object({
                pagination: z.object({
                  page: z.number(),
                  limit: z.number(),
                  total: z.number(),
                  total_pages: z.number(),
                  has_next: z.boolean(),
                  has_prev: z.boolean(),
                }),
              }),
            }),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/users',
    summary: 'Create user',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema,
          },
        },
      },
    },
    responses: {
      [HTTP_STATUS.CREATED]: {
        description: 'User created',
        content: {
          'application/json': {
            schema: z.object({
              success: z.boolean(),
              data: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                created_at: z.string(),
              }),
            }),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/users/{id}',
    summary: 'Get user by ID',
    request: {
      params: z.object({ id: z.string().uuid() }),
    },
    responses: {
      [HTTP_STATUS.OK]: {
        description: 'User details',
        content: {
          'application/json': {
            schema: z.object({
              success: z.boolean(),
              data: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                created_at: z.string(),
              }),
            }),
          },
        },
      },
    },
  });
}
