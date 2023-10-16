import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Seller } from './models/seller.model';
import { MailService } from '../../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Op } from 'sequelize';
import { LoginSellerDto } from './dto/login-seller.dto';
import { FindSellerDto } from './dto/find-seller.dto';

const { env } = process;

@Injectable()
export class SellerService {
  constructor(
      @InjectModel(Seller) private sellerRepository: typeof Seller,
      private readonly mailService: MailService,
      private readonly jwtService: JwtService,
  ) {}

  async registration(createSellerDto: CreateSellerDto, res: Response) {
    const findSeller = await this.sellerRepository.findOne({ where: { email: createSellerDto.email } });
    if (findSeller) {
      throw new BadRequestException('This Email is Already Registered!');
    }

    if (createSellerDto.password !== createSellerDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createSellerDto.password, 12);

    const newSeller = await this.sellerRepository.create({
      ...createSellerDto,
      hashed_password,
    });

    const tokens = await this.getSellerTokens(newSeller);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_key: string = v4();

    const updatedSeller = await this.sellerRepository.update(
        {
          hashed_refresh_token,
        },
        { where: { email: newSeller.email }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendSellerConfirmation(updatedSeller[1][0]);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Mail Confirmation Error');
    }

    const response = {
      message: 'Seller created successfully',
      seller: updatedSeller[1][0],
      tokens,
    };
    return response;
  }

  async login(loginSellerDto: LoginSellerDto, res: Response) {
    const { email, password } = loginSellerDto;

    const findSeller = await this.sellerRepository.findOne({ where: { email } });
    if (!findSeller) {
      throw new BadRequestException('Seller is not Found');
    }
    const isMatchPass = await bcrypt.compare(password, findSeller.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.getSellerTokens(findSeller);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);

    const updatedSeller = await this.sellerRepository.update(
        { hashed_refresh_token },
        { where: { id: findSeller.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Logged In Successfully',
      seller: updatedSeller[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const sellerData = await this.jwtService.verify(refreshToken, {
      secret: env.REFRESH_TOKEN_KEY,
    });
    if (!sellerData) {
      throw new UnauthorizedException('Seller not found');
    }

    const updatedSeller = await this.sellerRepository.update(
        { hashed_refresh_token: null },
        { where: { id: sellerData.id }, returning: true },
    );

    res.clearCookie('refresh_token');

    const response = {
      message: 'Logged Out Successfully',
      seller: updatedSeller[1][0],
    };
    return response;
  }

  async refreshToken(seller_id: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (seller_id != decodedToken['id']) {
      throw new BadRequestException('Seller not found');
    }

    const findSeller = await this.sellerRepository.findByPk(seller_id);
    if (!findSeller || !findSeller.hashed_refresh_token) {
      throw new BadRequestException('Seller not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, findSeller.hashed_refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden Token');
    }

    const tokens = await this.getSellerTokens(findSeller);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updatedSeller = await this.sellerRepository.update(
        { hashed_refresh_token },
        { where: { id: seller_id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Token refreshed successfully',
      seller: updatedSeller[1][0],
      tokens,
    };
    return response;
  }

  async findFilteredSellers(findSellerDto: FindSellerDto) {
    let where = {};

    if (findSellerDto.email) {
      where['email'] = { [Op.like]: `%${findSellerDto.email}%` };
    }
    if (findSellerDto.name) {
      where['username'] = { [Op.like]: `%${findSellerDto.name}%` };
    }

    const filteredSellers = await this.sellerRepository.findAll({ where, include: { all: true } });
    return filteredSellers;
  }

  async findOneById(id: number, req: Request) {
    const seller = req['seller'];
    if (seller.id == id || seller.role == 'SUPERSELLER') {
      const findSeller = await this.sellerRepository.findByPk(id);
      return findSeller;
    } else {
      throw new ForbiddenException('You do not have permission');
    }
  }

  async deleteSellerById(id: number) {
    await this.sellerRepository.destroy({ where: { id } });
    return {
      message: 'Successfully deleted',
    };
  }

  async updateSellerById(updateSellerDto: UpdateSellerDto, id: number) {
    const updatedSeller = await this.sellerRepository.update(
        { ...updateSellerDto },
        { where: { id }, returning: true },
    );
    return updatedSeller[1][0];
  }

  async getSellerTokens(seller: Seller) {
    const jwtPayload = {
      id: seller.id,
      email: seller.email,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: env.ACCESS_TOKEN_KEY,
        expiresIn: env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: env.REFRESH_TOKEN_KEY,
        expiresIn: env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
