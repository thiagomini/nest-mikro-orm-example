import { EntitySchema } from '@mikro-orm/core';
import { CustomBaseEntity } from './custom-base.entity';
import { Id } from './id';

export const customBaseEntitySchema = new EntitySchema<CustomBaseEntity>({
  name: 'CustomBaseEntity',
  abstract: true,
  properties: {
    id: {
      type: Id,
      primary: true,
      autoincrement: true,
    },
  },
});
