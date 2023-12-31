import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Address } from './address.entity';
import { User } from './user.entity';

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
    user: {
      entity: () => User,
      reference: 'm:1',
      inversedBy: 'addresses',
      ref: true
    },
    street: {
      type: String,
    },
  },
});
