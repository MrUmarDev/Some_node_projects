import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { FindPaymentDto } from './dto/find-payment.dto';
import { Op } from 'sequelize';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentRepository: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentRepository.findOne({ where: { planID: createPaymentDto.planID } });
    if (payment) {
      throw new BadRequestException('Payment already exists');
    }
    return this.paymentRepository.create(createPaymentDto);
  }

  async findAll(findPaymentDto: FindPaymentDto) {
    let where = {};

    if (findPaymentDto.planID) {
      where['planID'] = { [Op.like]: `%${findPaymentDto.planID}%` };
    }

    if (findPaymentDto.planID) {
      where = {
        ...where,
        planID: {
          [Op.gt]: findPaymentDto.planID,
        },
      };
    }
    if (findPaymentDto.planID) {
      where['planID'] = { [Op.like]: `%${findPaymentDto.planID}%` };
    }
    if (findPaymentDto.planID) {
      where = {
        ...where,
        planID: {
          [Op.lt]: findPaymentDto.planID,
        },
      };
    }

    return this.paymentRepository.findAll({ where, include: { all: true } });
  }

  findOne(id: number) {
    return this.paymentRepository.findByPk(id, { include: { all: true } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(
        { ...updatePaymentDto },
        { where: { id }, returning: true }
    );
  }

  remove(id: number) {
    return this.paymentRepository.destroy({ where: { id } });
  }
}
