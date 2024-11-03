import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Enable foreign key support (SQLite specific).
export const enableForeignKeys = "PRAGMA foreign_keys = ON;";

// Define the Users table
export const Users = sqliteTable(
  "Users",
  {
    id: text("id").primaryKey(), // UUID primary key
    email: text("email").notNull().unique(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: text("created_at").notNull(), // Store datetime as ISO 8601 string
    updatedAt: text("updated_at"),
    lastLogin: text("last_login"),
    lastLoginToken: text("last_login_token"),
  },
  (table) => ({
    usernameIndex: index("idx_users_username").on(table.username),
    idIndex: index("idx_users_id").on(table.id),
  })
);

// Define the Messages table with foreign key constraints
export const Messages = sqliteTable(
  "Messages",
  {
    id: text("id").primaryKey(), // ObjectID primary key
    eventType: text("event_type").notNull(),
    senderId: text("sender_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    receiverId: text("receiver_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: text("created_at").notNull(), // Store datetime as ISO 8601 string
    fileUrl: text("file_url"),
  },
  (table) => ({
    receiverIdIndex: index("idx_messages_receiver_id").on(table.receiverId),
  })
);

// Define the ChatList table with foreign key constraints
export const ChatList = sqliteTable("ChatList", {
  userId: text("user_id")
    .primaryKey()
    .references(() => Users.id, { onDelete: "cascade" }),
  lastMessage: text("last_message").references(() => Messages.id, {
    onDelete: "set null",
  }),
  lastMessageDatetime: text("last_message_datetime"), // Store datetime as ISO 8601 string
});

// Infer the TypeScript types for selecting and inserting
export type User = InferSelectModel<typeof Users>;
export type NewUser = InferInsertModel<typeof Users>;
export type Message = InferSelectModel<typeof Messages>;
export type NewMessage = InferInsertModel<typeof Messages>;
export type ChatListEntry = InferSelectModel<typeof ChatList>;
export type NewChatListEntry = InferInsertModel<typeof ChatList>;
