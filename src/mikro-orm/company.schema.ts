import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Company } from './company.entity';
import { User } from './user.entity';

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
    name: {
      type: String,
    },
    user: {
      entity: () => User,
      reference: '1:m',
      mappedBy: 'company',
      ref: true
    },
  },
});
