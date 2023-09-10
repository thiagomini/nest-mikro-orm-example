import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { EmployeeDetail } from './employee-detail.entity';

export const employeeDetailSchema = new EntitySchema<EmployeeDetail>({
  class: EmployeeDetail,
  tableName: 'employee_detail',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    employee: {
      entity: () => Employee,
      reference: '1:1',
      ref: true,
      inversedBy: 'detail'
    },
    salary: { 
      type: Number
    }
  },
});
