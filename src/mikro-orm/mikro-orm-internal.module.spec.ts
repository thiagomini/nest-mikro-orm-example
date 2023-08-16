import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { User } from './user.entity';

describe('MikroOrmInternalModule', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [MikroOrmInternalModule],
    }).compile();

    const orm = testingModule.get(MikroORM);
    orm.em.clear();
  });

  afterEach(async () => {
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

  test('creates a new user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager).fork();

    const user = new User({
      email: 'user2@mail.com',
      firstName: 'John2',
      lastName: 'Doe2',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    await entityManager.persistAndFlush(user);
  });

  test('creates a new user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager).fork();

    const user = new User({
      email: 'user3@mail.com',
      firstName: 'John3',
      lastName: 'Doe3',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    await entityManager.persistAndFlush(user);
  });
});
