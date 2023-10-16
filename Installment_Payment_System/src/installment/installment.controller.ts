import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { FindInstallmentDto } from './dto/find-installment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Installment } from './models/installment.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('installment')
@Controller('installment')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @ApiOperation({ summary: "Create a new installment" })
  @ApiResponse({ status: 201, type: Installment })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createInstallmentDto: CreateInstallmentDto) {
    return this.installmentService.create(createInstallmentDto);
  }

  @ApiOperation({ summary: "Get installments" })
  @ApiResponse({ status: 200, type: [Installment] })
  @Get()
  findAll(@Body() findInstallmentDto: FindInstallmentDto) {
    return this.installmentService.findAll(findInstallmentDto);
  }

  @ApiOperation({ summary: "Get installment" })
  @ApiResponse({ status: 200, type: Installment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.installmentService.findOne(+id);
  }

  @ApiOperation({ summary: "Update installment" })
  @ApiResponse({ status: 200, type: Installment })
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateInstallmentDto: UpdateInstallmentDto) {
    return this.installmentService.update(+id, updateInstallmentDto);
  }

  @ApiOperation({ summary: "Delete installment" })
  @ApiResponse({ status: 200, type: Installment })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.installmentService.remove(+id);
  }
}
