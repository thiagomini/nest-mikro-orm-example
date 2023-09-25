import { Collection, Reference } from "@mikro-orm/core";
import { Profile } from "./profile.entity";
import { Company } from "./company.entity";

export type CreateUserProps = {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  public readonly id: number;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly email: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly events: readonly unknown[];

  public readonly profiles: Collection<Profile> = new Collection<Profile>(this);

  public readonly company?: Reference<Company>;

  constructor(props: CreateUserProps) {
    Object.assign(this, props);
    this.events = [{ created: true }];
  }
}
