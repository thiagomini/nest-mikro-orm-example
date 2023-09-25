export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;

  
  constructor(props: { imageUrl: string, active: boolean, id?: number }) {
    Object.assign(this, props);
  }
}