import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Installment } from './models/installment.model';
import { FindInstallmentDto } from './dto/find-installment.dto';

@Injectable()
export class InstallmentService {
  constructor(@InjectModel(Installment) private installmentRepository: typeof Installment) {}

  async create(createInstallmentDto: CreateInstallmentDto): Promise<Installment> {
    return this.installmentRepository.create(createInstallmentDto);
  }

  async findAll(findInstallmentDto: FindInstallmentDto): Promise<Installment[]> {
    const { planName, sellerID } = findInstallmentDto;
    const where = {};

    if (planName) {
      where['planName'] = planName;
    }

    if (sellerID) {
      where['sellerID'] = sellerID;
    }

    return this.installmentRepository.findAll({ where });
  }

  async findOne(planID: number): Promise<Installment | null> {
    const installment = await this.installmentRepository.findByPk(planID);

    if (!installment) {
      throw new NotFoundException('Installment not found');
    }

    return installment;
  }

  async update(planID: number, updateInstallmentDto: UpdateInstallmentDto): Promise<[number, Installment[]]> {
    const [updatedCount, updatedInstallments] = await this.installmentRepository.update(
        updateInstallmentDto,
        { where: { planID }, returning: true },
    );

    if (updatedCount === 0) {
      throw new NotFoundException('Installment not found');
    }

    return [updatedCount, updatedInstallments];
  }

  async remove(planID: number): Promise<void> {
    const deletedCount = await this.installmentRepository.destroy({ where: { planID } });

    if (deletedCount === 0) {
      throw new NotFoundException('Installment not found');
    }
  }
}
