import { NextRequest } from 'next/server';
import { ApiResponseBuilder } from '@/lib/api/response';
import { AppError } from '@/lib/api/errors';
import { validateSchema } from '@/lib/api/validation';
import { userService } from '@/features/users/services/user-service';
import { updateUserSchema } from '@/features/users/dto/user-dto';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/users/:id - Get a user by ID
 *
 * @param request - Next.js request object
 * @param context - Route context with params
 * @returns User data
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const user = await userService.getUserById(id);

    return ApiResponseBuilder.success(user, 'User retrieved successfully');
  } catch (error) {
    if (error instanceof AppError) {
      return ApiResponseBuilder.error(error.message, error.statusCode);
    }

    return ApiResponseBuilder.error('Failed to retrieve user');
  }
}

/**
 * PUT /api/users/:id - Update a user
 *
 * @param request - Next.js request object
 * @param context - Route context with params
 * @returns Updated user data
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const result = validateSchema(updateUserSchema, body);

    if (!result.success) {
      return ApiResponseBuilder.validationError(result.error);
    }

    const user = await userService.updateUser(id, result.data);

    return ApiResponseBuilder.success(user, 'User updated successfully');
  } catch (error) {
    if (error instanceof AppError) {
      return ApiResponseBuilder.error(error.message, error.statusCode);
    }

    return ApiResponseBuilder.error('Failed to update user');
  }
}

/**
 * DELETE /api/users/:id - Delete a user
 *
 * @param request - Next.js request object
 * @param context - Route context with params
 * @returns Deleted user data
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const user = await userService.deleteUser(id);

    return ApiResponseBuilder.success(user, 'User deleted successfully');
  } catch (error) {
    if (error instanceof AppError) {
      return ApiResponseBuilder.error(error.message, error.statusCode);
    }

    return ApiResponseBuilder.error('Failed to delete user');
  }
}
