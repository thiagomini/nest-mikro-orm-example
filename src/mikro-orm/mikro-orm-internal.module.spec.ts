import { EntityManager, MikroORM, Reference, ref } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmInternalModule } from './mikro-orm-internal.module';
import { User } from './user.entity';
import { Address } from './address.entity';
import { Company } from './company.entity';
import { Profile } from './profile.entity';

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

  test('finds all profiles for all users of a company', async () => {
    // Arrange
    const entityManager = testingModule.get(EntityManager).fork();
    const company = new Company({
      name: 'Acme'
    });
    await entityManager.persistAndFlush(company);

    const user1 = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      company
    });
    const user2 = new User({
      email: 'user2@mail.com',
      firstName: 'John2',
      lastName: 'Doe2',
      createdAt: new Date(),
      updatedAt: new Date(),
      company
    })
    await entityManager.persistAndFlush([user1, user2]);

    const profileUser1 = new Profile({
      imageUrl: 'https://example.com',
      user: user1
    })
    const profile2User1 = new Profile({
      imageUrl: 'https://example.com/2',
      user: user1
    })
    const profileUser2 = new Profile({
      imageUrl: 'https://example.com',
      user: user2
    })

    await entityManager.persistAndFlush([profileUser1, profile2User1, profileUser2]);


    // Act
    const companyWithProfiles = await entityManager.findOne(Company, { id: company.id }, {
      populate: ['users.profiles'],
      refresh: true
    });

    // Assert
    const userWithASingleProfile = companyWithProfiles.users.find(u => u.id === user2.id);
    expect(userWithASingleProfile.profiles).toHaveLength(1);
  });

});
