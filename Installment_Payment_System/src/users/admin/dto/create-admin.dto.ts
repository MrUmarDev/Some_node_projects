import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsUrl, IsEnum, MinLength } from "class-validator";

enum AdminRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
}

export class CreateAdminDto {
    @ApiProperty({ example: "admin123", description: "Admin username" })
    @IsString()
    username: string;

    @ApiProperty({ example: "admin@example.com", description: "Admin email address" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "http://example.com/photo.jpg", description: "Admin Photo URL" })
    @IsUrl()
    photoURL: string;

    @ApiProperty({ example: "superadmin", description: "Admin role (superadmin or admin)" })
    @IsEnum(AdminRole)
    role: AdminRole.SUPERADMIN;

    @ApiProperty({ example: "password123", description: "Admin password (min length: 6)" })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: "password123", description: "Admin password (min length: 6)" })
    @IsString()
    @MinLength(6)
    confirm_password: string;
}
