import { EntityManager, MikroORM, ref } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { User } from './user.entity';
import { Address } from './address.entity';

describe('MikroOrmInternalModule', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [MikroOrmInternalModule],
    }).compile();

    
    const orm = testingModule.get(MikroORM);
    await orm.getSchemaGenerator().updateSchema({
      safe: true,
    });
    orm.em.clear();
  });

  afterEach(async () => {
    const orm = testingModule.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
    await testingModule.close();
  });


  test('creates a new user', async () => {
    // Arrange

    const entityManager = testingModule.get(EntityManager).fork();

    const user = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    await entityManager.persistAndFlush(user);
  });

});
