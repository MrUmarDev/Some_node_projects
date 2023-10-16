import {Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Res} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FindCustomersDto } from './dto/find-customers.dto';
import { Customer } from './models/customer.model';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../../guards/customer.guard';
import {LoginCustomerDto} from "./dto/customer-login.dto";
import {Response} from "express";

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, type: Customer })
  @Post('register')
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req) {
    return this.customerService.registration(createCustomerDto, req.res);
  }

  @ApiOperation({ summary: 'Login customer' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('login')
  async login(
        @Body() loginCustomerDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
      return this.customerService.login(loginCustomerDto, res);
    }

  @ApiOperation({ summary: 'Log out as a customer' })
  @ApiResponse({ status: 200, type: Customer })
  @UseGuards(CustomerGuard)
  @Get('logout/:refreshToken')
  logout(@Param('refreshToken') refreshToken: string, @Req() req) {
    return this.customerService.logout(refreshToken, req.res);
  }

  @ApiOperation({ summary: 'Refresh customer token' })
  @ApiResponse({ status: 200, type: Customer })
  @Get('refresh/:customer_id/:refreshToken')
  refreshToken(
      @Param('customer_id') customer_id: number,
      @Param('refreshToken') refreshToken: string,
      @Req() req
  ) {
    return this.customerService.refreshToken(customer_id, refreshToken, req.res);
  }

  @ApiOperation({ summary: 'Find customers based on filters' })
  @ApiResponse({ status: 200, type: [Customer] })
  @UseGuards(CustomerGuard)
  @Get('filter')
  findFilteredCustomers(@Body() findCustomersDto: FindCustomersDto) {
    return this.customerService.findFilteredCustomers(findCustomersDto);
  }

  @ApiOperation({ summary: 'Find a customer by ID' })
  @ApiResponse({ status: 200, type: Customer })
  @UseGuards(CustomerGuard)
  @Get(':id')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.customerService.findOneById(+id, req);
  }

  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiResponse({ status: 200, type: Customer })
  @UseGuards(CustomerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.deleteCustomerById(+id);
  }

  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, type: Customer })
  @UseGuards(CustomerGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.updateCustomerById(updateCustomerDto, +id);
  }
}
