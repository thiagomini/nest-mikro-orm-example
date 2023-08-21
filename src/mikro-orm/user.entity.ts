import { Collection } from '@mikro-orm/core';
import { Address } from './address.entity';

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

  public readonly addresses: Collection<Address> = new Collection<Address>(
    this,
  );

  constructor(props: CreateUserProps) {
    Object.assign(this, props);
    this.events = [{ created: true }];
  }
}
