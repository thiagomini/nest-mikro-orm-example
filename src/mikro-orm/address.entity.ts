import { Reference } from '@mikro-orm/core';
import type { User } from './user.entity';

export class Address {
  public readonly id: number;

  public readonly street: string;

  public readonly user: Reference<User>;

  constructor(props: { street: string; user: Reference<User> }) {
    Object.assign(this, props);
  }
}
