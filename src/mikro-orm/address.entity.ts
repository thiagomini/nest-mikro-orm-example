import type { User } from './user.entity';

export class Address {
  public readonly id: number;

  public readonly userId: number;

  public readonly street: string;

  public readonly user: User;

  constructor(props: { street: string; userId: number }) {
    Object.assign(this, props);
  }
}
