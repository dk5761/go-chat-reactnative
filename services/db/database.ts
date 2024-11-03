import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
// Import the combined schema
import { User } from "./models/user";
import { Message } from "./models/message";
import { Chat } from "./models/chatList";
import { dbSchema } from "./schema";

// SQLite adapter instance
const adapter = new SQLiteAdapter({
  schema: dbSchema,
});

// WatermelonDB database instance
export const database = new Database({
  adapter,
  modelClasses: [User, Chat, Message],
});
