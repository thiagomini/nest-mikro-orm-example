import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { userSchema } from './user.schema';
import { companySchema } from './company.schema';
import { profileSchema } from './profile.schema';

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
      debug: true
    }),
    MikroOrmModule.forFeature([userSchema, companySchema, profileSchema]),
  ],
})
export class MikroOrmInternalModule {}
