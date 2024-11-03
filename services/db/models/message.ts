import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export class Message extends Model {
  static table = "messages";

  @field("sender_id") senderId!: string;
  @field("receiver_id") receiverId!: string;
  @field("content") content!: string;
  @date("created_at") createdAt!: number;
  @field("file_url") fileUrl?: string;
}
