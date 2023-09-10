import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { userSchema } from './user.schema';
import { addressSchema } from './address.schema';
import { companySchema } from './company.schema';
import { employeeSchema } from './employee.schema';
import { employeeDetailSchema } from './employee-detail.schema';

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
        checkDuplicateEntities: false,
      },
      debug: true
    }),
    MikroOrmModule.forFeature([userSchema, addressSchema, companySchema, employeeSchema, employeeDetailSchema]),
  ],
})
export class MikroOrmInternalModule {}
