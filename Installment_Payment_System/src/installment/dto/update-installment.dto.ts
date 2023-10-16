import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

export class UpdateInstallmentDto {
    @ApiProperty({ example: 'Updated Plan', description: 'Updated Plan Name (optional)' })
    @IsOptional()
    @IsString()
    planName?: string;

    @ApiProperty({ example: 2, description: 'Updated Seller ID (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    sellerID?: number;

    @ApiProperty({ example: 5500.00, description: 'Updated Total Amount (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    totalAmount?: number;

    @ApiProperty({ example: 15, description: 'Updated Number of Installments (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    numberOfInstallments?: number;
}
