import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginAdminDto {
    @ApiProperty({ example: "admin123", description: "Admin username" })
    @IsString()
    username: string;

    @ApiProperty({ example: "password123", description: "Admin password" })
    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;
}
