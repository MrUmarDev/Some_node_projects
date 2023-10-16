import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

import { MailModule } from './mail/mail.module';
import { AdminGuard } from './guards/admin.guard';
import { AdminService } from './users/admin/admin.service';

import { AdminModule } from './users/admin/admin.module';
import { CustomerModule } from './users/customer/customer.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payments/payment.module';
import { InstallmentModule } from './installment/installment.module';

import { Admin } from './users/admin/models/admin.model';
import { Customer } from './users/customer/models/customer.model';
import { Product } from './product/models/product.model';
import { Payment } from './payments/models/payment.model';
import { Installment } from './installment/models/installment.model';
import {Seller} from "./users/seller/models/seller.model";
import {SellerModule} from "./users/seller/seller.module";
import * as process from "process";

const { env } = process;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: env.DB_URI,
      autoLoadModels: true,
      logging: false,
      models: [
        Admin,
        Customer,
        Seller,
        Product,
        Payment,
        Installment,
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AdminModule,
    CustomerModule,
    SellerModule,
    ProductModule,
    PaymentModule,
    MailModule,
    InstallmentModule,
  ],
  controllers: [],
  providers: [JwtService],
  exports: [],
})
export class AppModule {}
