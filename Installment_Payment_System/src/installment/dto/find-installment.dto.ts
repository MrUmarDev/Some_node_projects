import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, IsString } from 'class-validator';

export class FindInstallmentDto {
    @ApiProperty({ example: 'Plan A', description: 'Plan Name (optional)' })
    @IsOptional()
    @IsString()
    planName?: string;

    @ApiProperty({ example: 1, description: 'Seller ID (optional)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    sellerID?: number;
}
