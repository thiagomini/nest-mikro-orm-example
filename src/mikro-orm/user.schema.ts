import { EntitySchema } from '@mikro-orm/core';
import { User } from './user.entity';

export const userSchema = new EntitySchema<User>({
  class: User,
  tableName: 'user',
  properties: {
    id: {
      type: 'bigint',
      primary: true,
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
    createdAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
  },
});
