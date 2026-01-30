import type { PaginationParams } from '@/lib/api/types';
import { calculatePagination } from '@/lib/api/pagination';
import { BadRequestError } from '@/lib/api/errors';
import { userRepository } from '../repositories/user-repository';
import type { CreateUserDTO, UpdateUserDTO } from '../dto/user-dto';

/**
 * Service layer for user business logic
 */
export class UserService {
  /**
   * Retrieves paginated list of users
   *
   * @param params - Pagination parameters
   * @returns Paginated users with metadata
   */
  async getUsers(params: PaginationParams) {
    const { users, total } = await userRepository.findAll(params);
    const pagination = calculatePagination(params.page, params.limit, total);

    return { users, pagination };
  }

  /**
   * Retrieves a single user by ID
   *
   * @param id - User ID
   * @returns User object
   */
  async getUserById(id: string) {
    return await userRepository.findById(id);
  }

  /**
   * Creates a new user
   *
   * @param data - User creation data
   * @returns Created user object
   * @throws {BadRequestError} When email already exists
   */
  async createUser(data: CreateUserDTO) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestError('Email already exists');
    }

    return await userRepository.create(data);
  }

  /**
   * Updates an existing user
   *
   * @param id - User ID
   * @param data - User update data
   * @returns Updated user object
   * @throws {BadRequestError} When email already exists for another user
   */
  async updateUser(id: string, data: UpdateUserDTO) {
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email);

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestError('Email already exists');
      }
    }

    return await userRepository.update(id, data);
  }

  /**
   * Deletes a user by ID
   *
   * @param id - User ID
   * @returns Deleted user object
   */
  async deleteUser(id: string) {
    return await userRepository.delete(id);
  }
}

export const userService = new UserService();
