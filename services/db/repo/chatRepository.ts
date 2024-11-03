import { Database, Q } from "@nozbe/watermelondb";
import { Chat } from "../models/chatList";
import { Message } from "../models/message";
import { User as DbUser } from "../models/user";
import { User } from "@/state/queries/users/users";
import { userRepository } from "./userRepository";

export const chatRepository = {
  async createChat(
    database: Database,
    user: User,

    latestMessageId: string
  ): Promise<Chat | null> {
    return await database.write(async () => {
      // Check if a chat with the specified user_id already exists
      const existingChat = await database
        .get<Chat>("chats")
        .query(Q.where("user_id", user.id))
        .fetch();

      if (existingChat.length > 0) {
        console.log("Chat already exists for this user_id");
        return existingChat[0]; // Return the existing chat if found
      }

      //if chat does not exist.

      //create a user.
      await userRepository.createUser(database, user);

      // Create a new chat if no existing chat was found
      return await database.get<Chat>("chats").create((chat) => {
        chat._raw.id = Math.random().toString(36).substr(2, 9); // Sample ID generator
        chat.user_id = user.id;
        chat.message_id = latestMessageId;
      });
    });
  },

  async getChatByUserIds(database: Database, userId: string) {
    // Fetch chat records based on the user IDs
    const chats = await database
      .get<Chat>("chats")
      .query(Q.where("user_id", userId))
      .fetch();

    // Map through each chat to retrieve related user and latest message data
    const chatsWithRelations = await Promise.all(
      chats.map(async (chat) => {
        //@ts-ignore
        const user = await database.get<User>("users").find(chat.us);

        // Manually fetch the latest message based on `latest_message_id`
        const latestMessage = chat.message_id
          ? await database.get<Message>("messages").find(chat.message_id)
          : null;

        return {
          chat,
          user,
          latestMessage,
        };
      })
    );

    return chatsWithRelations;
  },
  async getChatUsers(database: Database) {
    // Fetch chat records based on the user IDs
    const chats = await database.get<Chat>("chats").query().fetch();

    // Map through each chat to retrieve related user and latest message data
    const chatsWithRelations = await Promise.all(
      chats.map(async (chat) => {
        //@ts-ignore
        const user = await database.get<User>("users").find(chat.user_id);

        // Manually fetch the latest message based on `latest_message_id`
        const message = chat.message_id
          ? await database.get<Message>("messages").find(chat.message_id)
          : null;

        return {
          user,
          message,
        };
      })
    );

    return chatsWithRelations;
  },
};
