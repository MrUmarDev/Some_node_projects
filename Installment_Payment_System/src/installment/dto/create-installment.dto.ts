import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateInstallmentDto {
    @ApiProperty({ example: 'Plan A', description: 'Plan Name' })
    @IsString()
    @IsNotEmpty()
    planName: string;

    @ApiProperty({ example: 1, description: 'Seller ID' })
    @IsNumber()
    @IsPositive()
    sellerID: number;

    @ApiProperty({ example: 5000.00, description: 'Total Amount' })
    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @ApiProperty({ example: 12, description: 'Number of Installments' })
    @IsNumber()
    @IsPositive()
    numberOfInstallments: number;
}
