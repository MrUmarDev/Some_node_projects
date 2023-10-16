import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Payment]),
      JwtModule.register({})
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
