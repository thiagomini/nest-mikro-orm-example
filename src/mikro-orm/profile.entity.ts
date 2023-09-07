import { Reference } from "@mikro-orm/core";
import { User } from "./user.entity";

export type CreateProfileProps = {
  id?: number;
  imageUrl: string;
  user: Reference<User>;
};

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly user: Reference<User>;

  constructor(props: CreateProfileProps) {
    Object.assign(this, props);
  }
}
