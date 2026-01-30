import { NextRequest } from 'next/server';
import { ApiResponseBuilder } from '@/lib/api/response';
import { parsePaginationParams } from '@/lib/api/pagination';
import { AppError } from '@/lib/api/errors';
import { validateSchema } from '@/lib/api/validation';
import { userService } from '@/features/users/services/user-service';
import { createUserSchema } from '@/features/users/dto/user-dto';

/**
 * GET /api/users - List all users with pagination
 *
 * @param request - Next.js request object
 * @returns Paginated list of users
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const paginationParams = parsePaginationParams(searchParams);

    const { users, pagination } = await userService.getUsers(paginationParams);

    return ApiResponseBuilder.paginated(
      users,
      pagination,
      'Users retrieved successfully'
    );
  } catch (error) {
    if (error instanceof AppError) {
      return ApiResponseBuilder.error(error.message, error.statusCode);
    }

    return ApiResponseBuilder.error('Failed to retrieve users');
  }
}

/**
 * POST /api/users - Create a new user
 *
 * @param request - Next.js request object
 * @returns Created user data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = validateSchema(createUserSchema, body);

    if (!result.success) {
      return ApiResponseBuilder.validationError(result.error);
    }

    const user = await userService.createUser(result.data);

    return ApiResponseBuilder.created(user, 'User created successfully');
  } catch (error) {
    if (error instanceof AppError) {
      return ApiResponseBuilder.error(error.message, error.statusCode);
    }

    return ApiResponseBuilder.error('Failed to create user');
  }
}
