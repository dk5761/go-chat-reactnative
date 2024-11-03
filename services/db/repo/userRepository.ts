import { Database } from "@nozbe/watermelondb";
import { User } from "../models/user";

export const userRepository = {
  /**
   * Creates a new user in the database with backend-provided fields.
   * All properties come from the backend, including dates.
   * @param database - The WatermelonDB database instance
   * @param userData - An object containing all user fields as received from the backend
   * @returns The created User model instance
   */
  async createUser(
    database: Database,
    userData: {
      id: string;
      email: string;
      username: string;
      createdAt: number;
      updatedAt: number;
      lastLogin: number;
    }
  ): Promise<User> {
    return await database.action(async () => {
      return await database.get<User>("users").create((user) => {
        user._raw.id = userData.id; // Use backend-provided ID
        user.email = userData.email;
        user.username = userData.username;
        user.createdAt = userData.createdAt;
        user.updatedAt = userData.updatedAt;
        user.lastLogin = userData.lastLogin;
      });
    });
  },

  /**
   * Retrieves a user by their unique identifier.
   * @param database - The WatermelonDB database instance
   * @param userId - The user's unique identifier
   * @returns The User model instance if found
   */
  async getUserById(
    database: Database,
    userId: string
  ): Promise<User | undefined> {
    return await database.get<User>("users").find(userId);
  },

  /**
   * Updates the last login timestamp for a user.
   * @param database - The WatermelonDB database instance
   * @param userId - The user's unique identifier
   * @param lastLogin - The timestamp to set as the last login
   */
  async updateUserLastLogin(
    database: Database,
    userId: string,
    lastLogin: number
  ): Promise<void> {
    await database.action(async () => {
      const user = await this.getUserById(database, userId);
      if (user) {
        await user.update((u) => {
          u.lastLogin = lastLogin;
        });
      }
    });
  },
};
