import {Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Res} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Seller } from './models/seller.model';
import { SellerGuard } from '../../guards/seller.guard';
import {LoginSellerDto} from "./dto/login-seller.dto";
import {LoginCustomerDto} from "../customer/dto/customer-login.dto";
import {FindSellerDto} from "./dto/find-seller.dto";
import {Customer} from "../customer/models/customer.model";
import {Response} from "express";
import { CookieGetter } from '../../decorators/cookie-getter.decorator';

@ApiTags('sellers')
@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @ApiOperation({ summary: 'Create a new seller' })
  @ApiResponse({ status: 201, type: Seller })
  @Post('register')
  create(@Body() createSellerDto: CreateSellerDto, @Req() req) {
    return this.sellerService.registration(createSellerDto, req.res);
  }

  @ApiOperation({ summary: 'Login seller' })
  @ApiResponse({ status: 200, type: Seller })
  @Post('login')
  async login(
      @Body() loginSellerDto: LoginSellerDto,
      @Res({ passthrough: true }) res: Response,
  ) {
    return this.sellerService.login(loginSellerDto, res);
  }

  @ApiOperation({ summary: 'Logout as a seller' })
  @ApiResponse({ status: 200, type: Seller })
  @UseGuards(SellerGuard)
  @Post('logout')
  logout(@Body('refreshToken') refreshToken: string, @Res({ passthrough: true }) res: Response) {
    return this.sellerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh seller token' })
  @ApiResponse({ status: 200, type: Seller })
  @Post('refresh-token')
  async refreshToken(@Param('id') seller_id: number, @CookieGetter('refresh_token') refreshToken: string, @Res() res: Response) {
    return this.sellerService.refreshToken(seller_id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Find sellers with filtering options' })
  @ApiResponse({ status: 200, type: [Seller] })
  @UseGuards(SellerGuard)
  @Get()
  findFilteredSellers(@Body() findSellersDto: FindSellerDto) {
    return this.sellerService.findFilteredSellers(findSellersDto);
  }

  @ApiOperation({ summary: 'Find seller by ID' })
  @ApiResponse({ status: 200, type: Seller })
  @UseGuards(SellerGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    return this.sellerService.findOneById(id, req);
  }


  @ApiOperation({ summary: 'Delete seller by ID' })
  @ApiResponse({ status: 200 })
  @UseGuards(SellerGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sellerService.deleteSellerById(id);
  }

  @ApiOperation({ summary: 'Update seller by ID' })
  @ApiResponse({ status: 200, type: Seller })
  @UseGuards(SellerGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.updateSellerById(updateSellerDto, id);
  }
}
