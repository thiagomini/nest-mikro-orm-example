import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Address } from './address.entity';

export const addressSchema = new EntitySchema<Address>({
  class: Address,
  tableName: 'address',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    userId: {
      type: BigIntType,
    },
    street: {
      type: String,
    },
  },
});
