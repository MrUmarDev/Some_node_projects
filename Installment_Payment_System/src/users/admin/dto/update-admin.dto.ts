import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength, IsEnum, IsUrl } from "class-validator";

enum AdminRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
}

export class UpdateAdminDto {
    @ApiPropertyOptional({ example: "admin123", description: "Updated admin username" })
    @IsString()
    @MinLength(4, { message: "Username must be at least 4 characters long" })
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({ example: "admin@example.com", description: "Updated admin email address" })
    @IsEmail({}, { message: "Invalid email format" })
    @IsOptional()
    email?: string;

    @ApiProperty({ example: "http://example.com/photo.jpg", description: "Admin Photo URL" })
    @IsUrl()
    photoURL: string;

    @ApiProperty({ example: "superadmin", description: "Admin role (superadmin or admin)" })
    @IsEnum(AdminRole)
    role: AdminRole;

    @ApiPropertyOptional({ example: "newpassword123", description: "Updated admin password" })
    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({ example: "newpassword123", description: "Confirm new password" })
    @IsString()
    @IsOptional()
    confirm_password?: string;
}
