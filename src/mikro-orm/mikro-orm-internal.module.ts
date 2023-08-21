import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { userSchema } from './user.schema';
import { addressSchema } from './address.schema';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      clientUrl: 'postgresql://postgres:postgres@localhost:5435/postgres',
      autoLoadEntities: true,
      allowGlobalContext: true,
      implicitTransactions: true,
      discovery: {
        warnWhenNoEntities: false,
      },
    }),
    MikroOrmModule.forFeature([userSchema, addressSchema]),
  ],
})
export class MikroOrmInternalModule {}
