import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FindPaymentDto } from './dto/find-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({ status: 201, type: Payment })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Get payments" })
  @ApiResponse({ status: 200, type: [Payment] })
  @Get()
  findAll(@Body() findPaymentDto: FindPaymentDto) {
    return this.paymentService.findAll(findPaymentDto);
  }

  @ApiOperation({ summary: "Get payment" })
  @ApiResponse({ status: 200, type: Payment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: "Update payment" })
  @ApiResponse({ status: 200, type: Payment })
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: "Delete payment" })
  @ApiResponse({ status: 200, type: Payment })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
