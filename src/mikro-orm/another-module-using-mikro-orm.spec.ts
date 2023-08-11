import { MikroORM } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';

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
    await testingModule.close();
  });

  test('connects to the database', async () => {
    const orm = testingModule.get(MikroORM);

    await expect(orm.isConnected()).resolves.toBe(true);
  });
});
