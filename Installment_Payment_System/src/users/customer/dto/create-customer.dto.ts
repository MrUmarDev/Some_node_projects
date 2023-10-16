import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsUrl, MinLength } from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({ example: 'Tom', description: 'First name of the customer' })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Bill', description: 'Last name of the customer' })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'tom.bill@example.com', description: 'Email address of the customer' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '1234567890', description: 'Phone number of the customer' })
    @IsNotEmpty()
    @IsPhoneNumber('UZ', { message: 'Invalid phone number' })
    phone: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Address of the customer' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: 'http://example.com/photo.jpg', description: 'URL of the customer\'s photo' })
    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid URL format' })
    photoURL: string;

    @ApiProperty({ example: 'AB1234567', description: 'Passport number of the customer' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Passport number must be at least 8 characters long' })
    passport: string;

    @ApiProperty({ example: 'password123', description: 'Password for the customer' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @ApiProperty({ example: 'confirm-password123', description: 'Confirmation password' })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}
