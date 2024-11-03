import { tableSchema } from "@nozbe/watermelondb";

export const messageSchema = tableSchema({
  name: "messages",
  columns: [
    { name: "sender_id", type: "string", isIndexed: true },
    { name: "receiver_id", type: "string", isIndexed: true },
    { name: "content", type: "string" },
    { name: "created_at", type: "number" },
    { name: "file_url", type: "string", isOptional: true },
  ],
});
