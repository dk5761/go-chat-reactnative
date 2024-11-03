import { Database, Q } from "@nozbe/watermelondb";
import { Chat } from "../models/chatList";
import { Message } from "../models/message";

export const chatRepository = {
  async createChat(
    database: Database,
    userId: string,
    latestMessageId: string
  ): Promise<Chat> {
    return await database.action(async () => {
      return await database.get<Chat>("chats").create((chat) => {
        chat._raw.id = Math.random().toString(36).substr(2, 9); // Sample ID generator
        chat.userId = userId;
        chat.latestMessageId = latestMessageId;
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
        const user = await database.get<User>("users").find(chat.userId);

        // Manually fetch the latest message based on `latest_message_id`
        const latestMessage = chat.latestMessageId
          ? await database.get<Message>("messages").find(chat.latestMessageId)
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
};
