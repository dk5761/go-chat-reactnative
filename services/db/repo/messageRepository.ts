import { Database, Q } from "@nozbe/watermelondb";
import { Message } from "../models/message";

export const messageRepository = {
  async createMessage(
    database: Database,
    id: string,
    senderId: string,
    receiverId: string,
    content: string,
    fileUrl?: string
  ): Promise<Message> {
    return await database.action(async () => {
      return await database.get<Message>("messages").create((message) => {
        message._raw.id = id; // Sample ID generator
        message.senderId = senderId;
        message.receiverId = receiverId;
        message.content = content;
        message.createdAt = Date.now();
        message.fileUrl = fileUrl;
      });
    });
  },

  async getMessagesByChat(
    database: Database,
    senderId: string,
    receiverId: string
  ): Promise<Message[]> {
    return await database
      .get<Message>("messages")
      .query(
        Q.or(Q.where("sender_id", senderId), Q.where("receiver_id", receiverId))
      )
      .fetch();
  },
};
