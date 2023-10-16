import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginSellerDto {
    @ApiProperty({ example: "seller@example.com", description: "Seller email address" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "password123", description: "Password" })
    @IsString()
    @IsNotEmpty()
    password: string;
}
