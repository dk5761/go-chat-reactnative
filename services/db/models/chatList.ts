import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import { User } from "./user";
import { Message } from "react-hook-form";
import { Associations } from "@nozbe/watermelondb/Model";

export class Chat extends Model {
  static table = "chats";
  static associations: Associations = {
    user: {
      type: "belongs_to",
      key: "user_id",
    },
    message: {
      type: "belongs_to",
      key: "message_id",
    },
  };

  @field("user_id") userId!: string;

  @field("latest_message_id") latestMessageId!: string;

  @relation("user", "user_id") user!: User;
  // Relationship to the latest Message in the chat
  @relation("message", "latest_message_id") latestMessage!: Message;
}
