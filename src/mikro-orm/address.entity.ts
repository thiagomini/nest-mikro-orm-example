import type { User } from './user.entity';

export class Address {
  public readonly id: number;

  public readonly street: string;

  public readonly user: User;

  constructor(props: { street: string; user: User }) {
    Object.assign(this, props);
  }
}
