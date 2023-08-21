export class Address {
  public readonly id: number;

  public readonly userId: number;

  public readonly street: string;

  constructor(props: { street: string; userId: number }) {
    Object.assign(this, props);
  }
}
