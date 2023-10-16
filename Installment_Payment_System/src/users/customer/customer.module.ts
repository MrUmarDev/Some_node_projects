import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MailModule } from '../../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomerGuard } from '../../guards/customer.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    MailModule,
    JwtModule.register({}),
  ],
  providers: [CustomerService, CustomerGuard],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
