import { Reference } from "@mikro-orm/core";
import { Employee } from "./employee.entity";

export type CreateEmployeeDetailProps = { 
  employee: Reference<Employee>;
  salary: number;
  id?: number;
}

export class EmployeeDetail {
  public readonly id: number;
  public readonly employee: Reference<Employee>;
  public readonly salary: number;

  constructor(props) { 
    Object.assign(this, props);
  }
}