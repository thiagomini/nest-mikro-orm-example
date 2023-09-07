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
    userId: {
      type: BigIntType,
    },
    user: {
      entity: () => User,
      reference: 'm:1',
      inversedBy: 'addresses',
    },
    street: {
      type: String,
    },
  },
});
