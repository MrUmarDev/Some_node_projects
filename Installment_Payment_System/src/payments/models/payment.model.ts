import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "../../users/customer/models/customer.model";
import { Installment } from "../../installment/models/installment.model";
import { Product } from "../../product/models/product.model";

interface IPayment {
    paymentID: number;
    customerID: number;
    planID: number;
    productID: number;
    paymentDate: Date;
    amountPaid: number;
}

@Table({ tableName: "payment" })
export class Payment extends Model<Payment, IPayment> {
    @ApiProperty({ example: 1, description: "Unique Id" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) paymentID: number;

    @ApiProperty({ example: 1, description: "Customer ID" })
    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER
    }) customerID: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @ApiProperty({ example: 1, description: "Plan ID" })
    @ForeignKey(() => Installment)
    @Column({
        type: DataType.INTEGER
    }) planID: number;

    @BelongsTo(() => Installment)
    installment: Installment;

    @ApiProperty({ example: 1, description: "Product ID" })
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER
    }) productID: number;

    @BelongsTo(() => Product)
    product: Product;

    @ApiProperty({ example: "2023-10-07", description: "Payment Date" })
    @Column({
        type: DataType.DATE
    }) paymentDate: Date;

    @ApiProperty({ example: 100.00, description: "Amount Paid" })
    @Column({
        type: DataType.DECIMAL(10, 2)
    }) amountPaid: number;
}
