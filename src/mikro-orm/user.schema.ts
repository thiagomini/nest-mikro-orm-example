import { EntitySchema } from '@mikro-orm/core';
import { CustomBaseEntity } from './custom-base.entity';
import { User } from './user.entity';

export const userSchema = new EntitySchema<User, CustomBaseEntity>({
  class: User,
  tableName: 'user',
  extends: 'CustomBaseEntity',
  properties: {
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
      onUpdate: () => new Date(),
      onCreate: () => new Date(),
    },
    events: {
      hidden: true,
      persist: false,
      type: 'virtual',
    },
  },
});
