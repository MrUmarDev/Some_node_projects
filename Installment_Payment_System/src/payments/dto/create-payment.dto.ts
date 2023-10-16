import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: 'Customer ID' })
    @IsNumber()
    @IsNotEmpty()
    customerID: number;

    @ApiProperty({ example: 1, description: 'Plan ID' })
    @IsNumber()
    @IsNotEmpty()
    planID: number;

    @ApiProperty({ example: 1, description: 'Product ID' })
    @IsNumber()
    @IsNotEmpty()
    productID: number;

    @ApiProperty({ example: '2023-10-07', description: 'Payment Date' })
    @IsDateString()
    @IsNotEmpty()
    paymentDate: Date;

    @ApiProperty({ example: 100.0, description: 'Amount Paid' })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    amountPaid: number;
}
