import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail, IsUrl } from "class-validator";

export class FindSellerDto {
    @ApiProperty({ example: "Tom Bill", description: "Seller name (optional)" })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: "seller@example.com", description: "Seller email address (optional)" })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "http://example.com/seller.jpg", description: "Seller Photo URL (optional)" })
    @IsOptional()
    @IsUrl()
    photoURL?: string;
}
