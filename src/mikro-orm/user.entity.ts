import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export type CreateUserProps = {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

@Entity({
  tableName: 'user',
})
export class User {
  @PrimaryKey()
  public readonly id: number;

  @Property()
  public readonly firstName: string;

  @Property()
  public readonly lastName: string;

  @Property()
  public readonly email: string;

  @Property({
    onCreate: () => new Date(),
  })
  public readonly createdAt: Date;

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  public readonly updatedAt: Date;

  public readonly events: readonly unknown[];

  constructor(props: CreateUserProps) {
    Object.assign(this, props);
    this.events = [{ created: true }];
  }
}
