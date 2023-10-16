import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Res, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { AdminGuard } from '../../guards/admin.guard';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../../helpers/cookie.getter';
import { FindAdminDto } from './dto/find-admin.dto';
import { Response } from 'express';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Register admin' })
  @ApiResponse({ status: 201, type: Admin })
  @UseGuards(AdminGuard)
  @Post('signup')
  async registration(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('signin')
  async login(@Body() loginAdminDto: LoginAdminDto, @Res() res: Response) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @Post('signout')
  async logout(@CookieGetter('refresh_token') refreshToken: string, @Res() res: Response) {
    return this.adminService.logout(refreshToken, res);
  }

  @UseGuards(AdminGuard)
  @Post(':id/refresh-token')
  async refreshToken(@Param('id') admin_id: number, @CookieGetter('refresh_token') refreshToken: string, @Res() res: Response) {
    return this.adminService.refreshToken(admin_id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Find filtered admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(AdminGuard)
  @Post('findall')
  async findFilteredAdmins(@Body() findAdminDto: FindAdminDto) {
    return this.adminService.findFilteredAdmins(findAdminDto);
  }

  @ApiOperation({ summary: 'Find admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @ApiParam({ name: 'id', type: Number })
  @Get('find/:id')
  async findAdminById(@Param('id') id: number, @Req() req: Request) {
    return this.adminService.findOneById(id, req);
  }

  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  async deleteAdminById(@Param('id') id: number) {
    return this.adminService.deleteAdminById(id);
  }

  @ApiOperation({ summary: 'Update admin by ID' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @Put('update/:id')
  async updateAdminById(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdminById(updateAdminDto, id);
  }
}
