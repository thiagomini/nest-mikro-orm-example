import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
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
    await orm.em.begin();
  });

  afterEach(async () => {
    const orm = testingModule.get(MikroORM);
    await orm.em.rollback();
    orm.em.clear();
    await testingModule.close();
  });

  test('creates a new user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager);
    const repository = testingModule.get<EntityRepository<User>>(
      getRepositoryToken(User),
    );

    const user = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    await entityManager.persistAndFlush(user);
    console.log(user);

    // Assert
    const newUserInDb = await repository.findOne(user.id);
    expect(newUserInDb).toMatchObject({
      id: expect.any(String),
      firstName: 'John',
      lastName: 'Doe',
      createdAt: expect.any(Date),
    });
  });

  test('creates a new user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager);
    const repository = testingModule.get<EntityRepository<User>>(
      getRepositoryToken(User),
    );

    const user = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    await entityManager.persistAndFlush(user);

    // Assert
    const newUserInDb = await repository.findOne(user.id);
    expect(newUserInDb).toMatchObject({
      id: expect.any(String),
      firstName: 'John',
      lastName: 'Doe',
      createdAt: expect.any(Date),
    });
  });

  test('creates a new user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager);
    const repository = testingModule.get<EntityRepository<User>>(
      getRepositoryToken(User),
    );

    const user = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    await entityManager.persistAndFlush(user);

    // Assert
    const newUserInDb = await repository.findOne(user.id);
    expect(newUserInDb).toMatchObject({
      id: expect.any(String),
      firstName: 'John',
      lastName: 'Doe',
      createdAt: expect.any(Date),
    });
  });
});
