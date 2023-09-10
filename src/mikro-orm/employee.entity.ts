import { Reference } from "@mikro-orm/core";
import { Company } from "./company.entity";

export type CreateEmployeeProps = {
  email: string;
  company: Reference<Company>;
  id?: number;
}

export class Employee {

  public readonly id: number;
  public readonly email: string;
  public readonly company: Reference<Company>;

  constructor(props) {
    Object.assign(this, props);
  }
}