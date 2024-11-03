import { tableSchema } from "@nozbe/watermelondb";

export const chatSchema = tableSchema({
  name: "chats",
  columns: [
    { name: "id", type: "string", isIndexed: true },
    { name: "user_id", type: "string", isIndexed: true },
    { name: "message_id", type: "string", isIndexed: true },
    // { name: "user", type: "string" },
    // { name: "message", type: "string" },
  ],
});
