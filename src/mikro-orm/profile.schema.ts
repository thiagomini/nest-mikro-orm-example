import { BigIntType, EntitySchema } from '@mikro-orm/core';
import { Profile } from './profile.entity';
import { User } from './user.entity';

export const profileSchema = new EntitySchema<Profile>({
  class: Profile,
  tableName: 'profile',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    user: {
      entity: () => User,
      reference: '1:1',
      mappedBy: 'profile',
      ref: true,
    },
    imageUrl: {
      type: String,
    },
  },
});
