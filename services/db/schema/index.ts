import { appSchema } from "@nozbe/watermelondb";
import { userSchema } from "./userSchema";
import { chatSchema } from "./chatSchema";
import { messageSchema } from "./messageSchema";

export const dbSchema = appSchema({
  version: 1,
  tables: [userSchema, chatSchema, messageSchema],
});
