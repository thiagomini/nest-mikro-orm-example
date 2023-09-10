import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { EmployeeDetail } from './employee-detail.entity';

export const employeeSchema = new EntitySchema<Employee>({
  class: Employee,
  tableName: 'user',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    email: {
      type: String,
      persist: false
    },
    company: { 
      entity: () => Company,
      reference: 'm:1',
      ref: true,
      persist: false
    },
    detail: {
      entity: () => EmployeeDetail,
      reference: '1:1',
      mappedBy: 'employee',
    }
  },
});
