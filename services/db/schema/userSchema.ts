import { tableSchema } from "@nozbe/watermelondb";

export const userSchema = tableSchema({
  name: "users",
  columns: [
    { name: "id", type: "string", isIndexed: true },
    { name: "email", type: "string" },
    { name: "username", type: "string" },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
    { name: "last_login", type: "number" },
  ],
});
