import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsPhoneNumber } from 'class-validator';

export class FindCustomersDto {
    @ApiProperty({ example: 1, description: 'Customer ID' })
    @IsOptional()
    customerID?: number;

    @ApiProperty({ example: 'Tom', description: 'First name of the customer' })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ example: 'Bill', description: 'Last name of the customer' })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ example: 'tom.bill@example.com', description: 'Email address of the customer' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: '+1234567890', description: 'Phone number of the customer' })
    @IsOptional()
    @IsPhoneNumber('UZ', { message: 'Invalid phone number format' })
    phone?: string;

    @ApiProperty({ example: '123 Main St', description: 'Address of the customer' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ example: 'http://example.com/photo.jpg', description: 'Photo URL of the customer' })
    @IsOptional()
    @IsString()
    photoURL?: string;

    @ApiProperty({ example: 'AB123456', description: 'Passport number of the customer' })
    @IsOptional()
    @IsString()
    passport?: string;
}
