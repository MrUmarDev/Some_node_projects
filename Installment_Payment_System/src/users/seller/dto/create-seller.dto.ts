import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, IsUrl } from "class-validator";

export class CreateSellerDto {
    @ApiProperty({ example: "Tom Bill", description: "Seller name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "seller@example.com", description: "Seller email address" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "http://example.com/seller.jpg", description: "Seller Photo URL" })
    @IsUrl()
    @IsNotEmpty()
    photoURL: string;

    @ApiProperty({ example: "password123", description: "Password" })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'confirm-password123', description: 'Confirmation password' })
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}
