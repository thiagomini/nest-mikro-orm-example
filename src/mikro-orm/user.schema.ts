import { EntitySchema } from '@mikro-orm/core';
import { User } from './user.entity';

export const userSchema = new EntitySchema<User>({
  class: User,
  tableName: 'user',
  properties: {
    id: {
      type: 'integer',
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
      default: () => new Date(),
    },
    updatedAt: {
      type: 'timestamp',
      onUpdate: () => new Date(),
    },
  },
});
