import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      clientUrl: 'postgresql://postgres:postgres@localhost:5435/postgres',
      autoLoadEntities: true,
      allowGlobalContext: true,
      implicitTransactions: false,
      debug: true,
    }),
  ],
})
export class MikroOrmInternalModule {}
