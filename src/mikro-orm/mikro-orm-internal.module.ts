import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './user.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      clientUrl: 'postgresql://postgres:postgres@localhost:5435/postgres',
      autoLoadEntities: true,
      allowGlobalContext: true,
      implicitTransactions: false,
      discovery: {
        warnWhenNoEntities: false,
        checkDuplicateEntities: false,
      },
    }),
    MikroOrmModule.forFeature([User]),
  ],
})
export class MikroOrmInternalModule {}
