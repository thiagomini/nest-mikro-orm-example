import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { User } from './user.entity';
import { Address } from './address.entity';

export const userSchema = new EntitySchema<User>({
  class: User,
  tableName: 'user',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    createdAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
    },
    addresses: {
      reference: '1:m',
      entity: () => Address,
      mappedBy: 'user',
    },
    updatedAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
  },
});
