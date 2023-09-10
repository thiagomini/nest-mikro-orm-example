import { EntityManager, MikroORM, Reference, ref } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { User } from './user.entity';
import { Address } from './address.entity';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { EmployeeDetail } from './employee-detail.entity';

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
  });

  test('creates a new address', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager);

    const user = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entityManager.persistAndFlush(user);

    // Act
    const newAddress = new Address({
      street: '123 Main St',
      user: new Reference(user),
    })

    await entityManager.persistAndFlush(newAddress);

    // Assert
    expect(newAddress.id).toBeDefined();
  });

  test('creates a new employee detail', async () => {
    // Arrange

    const entityManager = testingModule.get(EntityManager).fork();
    const user = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entityManager.persistAndFlush(user);

    const company = new Company({
      name: 'Acme',
    });
    await entityManager.persistAndFlush(company);

    const employee = new Employee({
      email: user.email,
      company: new Reference(company),
    });

    const employeeDetail = new EmployeeDetail({
      employee: new Reference(employee),
      salary: 10_000,
    })    

    // Act
    await entityManager.persistAndFlush(employeeDetail);
  });
});
