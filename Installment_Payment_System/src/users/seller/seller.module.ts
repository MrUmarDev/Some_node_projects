import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seller } from './models/seller.model';
import { MailModule } from '../../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { SellerGuard } from '../../guards/seller.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Seller]),
    MailModule,
    JwtModule.register({}),
  ],
  providers: [SellerService, SellerGuard],
  controllers: [SellerController],
  exports: [SellerService],
})
export class SellerModule {}
