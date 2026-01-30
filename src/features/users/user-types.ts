import { ApiResponse, PaginationMeta } from '@/lib/api/types';
import { User } from '@/db/schema';

export type { User };

export type GetUsersResponse = ApiResponse<User[]> & {
  meta: {
    pagination: PaginationMeta;
  };
};

export type CreateUserResponse = ApiResponse<User>;
