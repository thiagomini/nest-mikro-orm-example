type CreateCompanyProps = {
  name: string;
  id?: number;
};

export class Company {
  public readonly id: number;
  public readonly name: string;

  constructor(props: CreateCompanyProps) {
    Object.assign(this, props);
  }
}