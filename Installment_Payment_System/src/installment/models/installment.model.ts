import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Seller } from '../../users/seller/models/seller.model';

interface IInstallment {
    planID: number;
    planName: string;
    sellerID: number;
    totalAmount: number;
    numberOfInstallments: number;
}

@Table({ tableName: "installment" })
export class Installment extends Model<Installment, IInstallment> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    planID: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    planName: string;

    @ForeignKey(() => Seller)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sellerID: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    totalAmount: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    numberOfInstallments: number;
}
