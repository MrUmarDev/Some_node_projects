import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail, IsUrl } from "class-validator";

export class UpdateSellerDto {
    @ApiProperty({ example: "Tom Bill", description: "Updated seller name (optional)" })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: "seller@example.com", description: "Updated seller email address (optional)" })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "http://example.com/seller.jpg", description: "Updated seller Photo URL (optional)" })
    @IsOptional()
    @IsUrl()
    photoURL?: string;
}
