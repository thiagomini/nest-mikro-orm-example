import { EntityManager, MikroORM, Reference, ref } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Address } from './address.entity';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { User } from './user.entity';
import { Profile } from './profile.entity';

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
    const orm = testingModule.get(MikroORM);
    await orm.getSchemaGenerator().clearDatabase();
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

    // Assert
    expect(user.id).toBeDefined();
  });

  test('creates a new address', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager).fork();

    const user = new User({
      email: 'user2@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entityManager.persistAndFlush(user);

    // Act
    const newAddress = new Address({
      street: '123 Main St',
      // It fails when using `ref(user)`
      user: new Reference(user),
    });

    await entityManager.persistAndFlush(newAddress);

    // Assert
    expect(newAddress.id).toBeDefined();
  });

  test('creates a new profile', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager).fork();

    const user = new User({
      email: 'user3@mail.com',
      firstName: 'John3',
      lastName: 'Doe3',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entityManager.persistAndFlush(user);

    // Act
    const newProfile = new Profile({
      user: ref(user),
      imageUrl: 'https://example.com/image.png',
    });

    await entityManager.persistAndFlush(newProfile);

    // Assert
    expect(newProfile.id).toBeDefined();
  });
});
