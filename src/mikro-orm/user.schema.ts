import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { User } from './user.entity';
import { Address } from './address.entity';
import { Profile } from './profile.entity';

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
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    addresses: {
      reference: '1:m',
      entity: () => Address,
      mappedBy: 'user',
    },
    profile: {
      reference: '1:1',
      entity: () => Profile,
      inversedBy: 'user',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
    },
    updatedAt: {
      type: 'timestamp',
    },
  },
});
