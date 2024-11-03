import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export class User extends Model {
  static table = "users";

  @field("email") email!: string;
  @field("username") username!: string;
  @date("created_at") createdAt!: number;
  @date("updated_at") updatedAt!: number;
  @date("last_login") lastLogin!: number;
}
