import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class MikroOrmInternalModule {
  public static forTests(): DynamicModule {
    return {
      module: MikroOrmInternalModule,
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
    };
  }
}
