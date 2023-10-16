import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsEnum } from "class-validator";

enum AdminRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
}

export class FindAdminDto {
    @ApiPropertyOptional({ example: "superadmin", description: "Filter by admin role" })
    @IsEnum(AdminRole)
    @IsOptional()
    role?: AdminRole;

    @ApiPropertyOptional({ example: "admin@example.com", description: "Filter by admin email" })
    @IsEmail({}, { message: "Invalid email format" })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: "admin123", description: "Filter by admin username" })
    @IsString()
    @IsOptional()
    username?: string;
}
