import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateCustomerDto {
    @ApiProperty({ example: 'Tom', description: 'Updated first name of the customer' })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ example: 'Bill', description: 'Updated last name of the customer' })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ example: 'tom.bill@example.com', description: 'Updated email address of the customer' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: '+1234567890', description: 'Updated phone number of the customer' })
    @IsOptional()
    @IsPhoneNumber('UZ', { message: 'Invalid phone number format' })
    phone?: string;

    @ApiProperty({ example: '123 Main St', description: 'Updated address of the customer' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ example: 'http://example.com/new-photo.jpg', description: 'Updated photo URL of the customer' })
    @IsOptional()
    @IsString()
    photoURL?: string;

    @ApiProperty({ example: 'AB123456', description: 'Updated passport number of the customer' })
    @IsOptional()
    @IsString()
    passport?: string;
}
