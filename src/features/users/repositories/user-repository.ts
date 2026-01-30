import { eq, count } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/db';
import { user as userSchema } from '@/db/schema';
import type { PaginationParams } from '@/lib/api/types';
import { calculateOffset } from '@/lib/api/pagination';
import { DatabaseError, NotFoundError } from '@/lib/api/errors';
import type { CreateUserDTO, UpdateUserDTO } from '../dto/user-dto';

/**
 * Repository for user database operations
 */
export class UserRepository {
  /**
   * Retrieves all users with pagination
   *
   * @param pagination - Pagination parameters
   * @returns Array of users and total count
   * @throws {DatabaseError} When database operation fails
   */
  async findAll(pagination: PaginationParams) {
    try {
      const offset = calculateOffset(pagination.page, pagination.limit);

      const [userList, totalCount] = await Promise.all([
        db.select().from(userSchema).limit(pagination.limit).offset(offset),
        db.select({ count: count() }).from(userSchema),
      ]);

      return {
        users: userList,
        total: totalCount[0]?.count ?? 0,
      };
    } catch {
      throw new DatabaseError('Failed to retrieve users');
    }
  }

  /**
   * Finds a user by ID
   *
   * @param id - User ID
   * @returns User object
   * @throws {NotFoundError} When user is not found
   * @throws {DatabaseError} When database operation fails
   */
  async findById(id: string) {
    try {
      const user = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.id, id))
        .limit(1);

      if (!user[0]) {
        throw new NotFoundError('User');
      }

      return user[0];
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to retrieve user');
    }
  }

  /**
   * Finds a user by email
   *
   * @param email - User email
   * @returns User object or null if not found
   * @throws {DatabaseError} When database operation fails
   */
  async findByEmail(email: string) {
    try {
      const user = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.email, email))
        .limit(1);
      return user[0] ?? null;
    } catch {
      throw new DatabaseError('Failed to retrieve user by email');
    }
  }

  /**
   * Creates a new user
   *
   * @param data - User creation data
   * @returns Created user object
   * @throws {DatabaseError} When database operation fails
   */
  async create(data: CreateUserDTO) {
    try {
      const newUser = await db
        .insert(userSchema)
        .values({
          id: uuidv4(),
          name: data.name ?? 'Unknown',
          email: data.email,
          email_verified: false,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();
      return newUser[0];
    } catch {
      throw new DatabaseError('Failed to create user');
    }
  }

  /**
   * Updates an existing user
   *
   * @param id - User ID
   * @param data - User update data
   * @returns Updated user object
   * @throws {NotFoundError} When user is not found
   * @throws {DatabaseError} When database operation fails
   */
  async update(id: string, data: UpdateUserDTO) {
    try {
      await this.findById(id);

      const updatedUser = await db
        .update(userSchema)
        .set({
          ...data,
          updated_at: new Date(),
        })
        .where(eq(userSchema.id, id))
        .returning();

      return updatedUser[0];
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to update user');
    }
  }

  /**
   * Deletes a user by ID
   *
   * @param id - User ID
   * @returns Deleted user object
   * @throws {NotFoundError} When user is not found
   * @throws {DatabaseError} When database operation fails
   */
  async delete(id: string) {
    try {
      await this.findById(id);

      const deletedUser = await db
        .delete(userSchema)
        .where(eq(userSchema.id, id))
        .returning();

      return deletedUser[0];
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to delete user');
    }
  }

  /**
   * Counts total number of users
   *
   * @returns Total user count
   * @throws {DatabaseError} When database operation fails
   */
  async count() {
    try {
      const result = await db.select({ count: count() }).from(userSchema);
      return result[0]?.count ?? 0;
    } catch {
      throw new DatabaseError('Failed to count users');
    }
  }
}

export const userRepository = new UserRepository();
