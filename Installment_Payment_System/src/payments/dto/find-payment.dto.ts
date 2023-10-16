import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class FindPaymentDto {
    @ApiProperty({ example: 1, description: 'Customer ID (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    customerID?: number;

    @ApiProperty({ example: 1, description: 'Plan ID (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    planID?: number;

    @ApiProperty({ example: 1, description: 'Product ID (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    productID?: number;

    @ApiProperty({ example: '2023-10-07', description: 'Start Date for Payment Date (optional)' })
    @IsOptional()
    @IsDateString()
    paymentDate?: Date;

    @ApiProperty({ example: 100.0, description: 'Minimum Amount Paid (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amountPaid?: number;
}
