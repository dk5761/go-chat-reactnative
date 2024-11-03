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
      username: string;
      email: string;
      created_at: Date;
      updated_at: Date;
      last_login: Date;
    }
  ): Promise<User> {
    return await database.write(async () => {
      const user = await database.get<User>("users").find(userData.id);

      if (!user) {
        return await database.get<User>("users").create((user) => {
          user._raw.id = userData.id; // Use backend-provided ID
          user.email = userData.email;
          user.username = userData.username;
          user.created_at = Math.floor(
            new Date(userData.created_at).getTime() / 1000
          );
          user.updated_at = Math.floor(
            new Date(userData.updated_at).getTime() / 1000
          );
          user.last_login = Math.floor(
            new Date(userData.last_login).getTime() / 1000
          );
        });
      }

      return user;
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
    lastLogin: Date
  ): Promise<void> {
    await database.write(async () => {
      const user = await this.getUserById(database, userId);
      if (user) {
        await user.update((u) => {
          u.last_login = Math.floor(new Date(lastLogin).getTime() / 1000);
        });
      }
    });
  },
};
