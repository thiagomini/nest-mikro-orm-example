import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { User } from './user.entity';
import { Address } from './address.entity';
import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';

describe('MikroOrmInternalModule', () => {
  let testingModule: TestingModule;
  let repository: EntityRepository<User>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [MikroOrmInternalModule],
    }).compile();

    const orm = testingModule.get(MikroORM);
    repository = testingModule.get(getRepositoryToken(User));
    orm.em.clear();
  });

  afterEach(async () => {
    await testingModule.close();
  });

  test('finds an existing user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager).fork();
    const user = new User({
      email: 'user2@mail.com',
      firstName: 'John2',
      lastName: 'Doe2',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entityManager.persistAndFlush(user);

    user.addresses.add(new Address({ street: 'street', userId: user.id }));
    await entityManager.persistAndFlush(user);

    // Act
    const foundUser = await repository.findOneOrFail(user.id, {
      refresh: true,
    });
    await foundUser.addresses.init();

    // Assert
    expect(foundUser.addresses).toHaveLength(1);
  });
});
