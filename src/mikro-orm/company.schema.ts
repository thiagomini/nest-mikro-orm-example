import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Company } from './company.entity';
import { Employee } from './employee.entity';

export const companySchema = new EntitySchema<Company>({
  class: Company,
  tableName: 'company',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    employees: {
      entity: () => Employee,
      reference: '1:m',
      ref: true,
      mappedBy: 'company'
    },
    name: {
      type: String,
    },
  },
});
