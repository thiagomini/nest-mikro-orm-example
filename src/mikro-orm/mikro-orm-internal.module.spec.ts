import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { userSchema } from './user.schema';
import { User } from './user.entity';
import { customBaseEntitySchema } from './custom-base.entity.schema';

describe('MikroOrmInternalModule', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        MikroOrmInternalModule.forTests(),
        MikroOrmModule.forFeature([customBaseEntitySchema, userSchema]),
      ],
    }).compile();

    const orm = testingModule.get(MikroORM);
    await orm.em.begin();
  });

  afterEach(async () => {
    const orm = testingModule.get(MikroORM);
    await orm.em.rollback();
    await testingModule.close();
  });

  test('connects to the database', async () => {
    const orm = testingModule.get(MikroORM);

    await expect(orm.isConnected()).resolves.toBe(true);
  });

  test('creates a new user', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager);
    const repository = testingModule.get<EntityRepository<User>>(
      getRepositoryToken(userSchema),
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
