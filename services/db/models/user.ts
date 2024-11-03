import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export class User extends Model {
  static table = "users";

  @field("email") email!: string;
  @field("username") username!: string;
  @date("created_at") created_at!: number;
  @date("updated_at") updated_at!: number;
  @date("last_login") last_login!: number;
}
