import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Op } from 'sequelize';
import { LoginCustomerDto } from './dto/customer-login.dto';
import { FindCustomersDto } from './dto/find-customers.dto';

const { env } = process;

@Injectable()
export class CustomerService {
  constructor (
      @InjectModel(Customer) private customerRepository: typeof Customer,
      private readonly jwtService: JwtService,
      private readonly mailService: MailService,
  ) {}

  async registration (
      createCustomerDto: CreateCustomerDto,
      res: Response,
  ) {
    const findCustomer = await this.customerRepository.findOne({ where: { email: createCustomerDto.email } });
    if (findCustomer) {
      throw new BadRequestException('This Email Already Registered!');
    }

    if (createCustomerDto.password !== createCustomerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createCustomerDto.password, 12);

    const newCustomer = await this.customerRepository.create({
      ...createCustomerDto,
      hashed_password,
    });

    const tokens = await this.getCustomerTokens(newCustomer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_key: string = v4();

    const updatedCustomer = await this.customerRepository.update(
        {
          hashed_refresh_token,
        },
        { where: { email: newCustomer.email }, returning: true }
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendCustomerConfirmation(updatedCustomer[1][0]);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Mail Confirmation Error');
    }

    const response = {
      message: 'Customer created successfully',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  async login (
      loginCustomerDto: LoginCustomerDto,
      res: Response,
  ) {
    const { email, password } = loginCustomerDto;

    const findCustomer = await this.customerRepository.findOne({ where: { email } });
    if (!findCustomer) {
      throw new BadRequestException('Customer is not Found');
    }
    const isMatchPass = await bcrypt.compare(password, findCustomer.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Customer is not Found');
    }

    const tokens = await this.getCustomerTokens(findCustomer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);

    const updatedCustomer = await this.customerRepository.update(
        { hashed_refresh_token },
        { where: { id: findCustomer.id }, returning: true }
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Logged In Successfully',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  async logout(
      refreshToken: string,
      res: Response
  ) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: env.REFRESH_TOKEN_KEY,
    });
    if (!customerData) {
      throw new UnauthorizedException('Customer not found');
    }

    const updatedCustomer = await this.customerRepository.update(
        { hashed_refresh_token: null },
        { where: { id: customerData.id }, returning: true }
    );

    res.clearCookie('refresh_token');

    const response = {
      message: 'Logged Out Successfully',
      customer: updatedCustomer[1][0],
    };
    return response;
  }

  async refreshToken(
      customer_id: number,
      refreshToken: string,
      res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) {
      throw new BadRequestException('Customer not found');
    }

    const findCustomer = await this.customerRepository.findByPk(customer_id);
    if (!findCustomer || !findCustomer.hashed_refresh_token) {
      throw new BadRequestException('Customer not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, findCustomer.hashed_refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden Token');
    }

    const tokens = await this.getCustomerTokens(findCustomer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updatedCustomer = await this.customerRepository.update(
        { hashed_refresh_token },
        { where: { id: customer_id }, returning: true }
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Token refreshed successfully',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  async findFilteredCustomers(findFilteredCustomersDto: FindCustomersDto) {
    let where = {};

    if (findFilteredCustomersDto.email) {
      where['email'] = { [Op.like]: `%${findFilteredCustomersDto.email}%` };
    }
    if (findFilteredCustomersDto.customerID) {
      where['customerID'] = { [Op.like]: `%${findFilteredCustomersDto.customerID}%` };
    }

    const filteredCustomers = await this.customerRepository.findAll({ where, include: { all: true } });
    return filteredCustomers;
  }

  async findOneById(id: number, req: Request) {
    const findCustomer = await this.customerRepository.findByPk(id, { include: { all: true } });
    return findCustomer;
  }

  async deleteCustomerById(id: number) {
    await this.customerRepository.destroy({ where: { id } });
    return {
      message: 'Successfully deleted',
    };
  }

  async updateCustomerById(updateCustomerDto: UpdateCustomerDto, id: number) {
    const updatedCustomer = await this.customerRepository.update(
        { ...updateCustomerDto },
        { where: { id }, returning: true }
    );
    return updatedCustomer[1][0];
  }

  async getCustomerTokens(customer: Customer) {
    const jwtPayload = {
      id: customer.id,
      email: customer.email,
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
