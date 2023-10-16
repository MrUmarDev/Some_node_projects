import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class FindProductDto {
    @ApiPropertyOptional({ example: 1, description: "Unique Id" })
    @IsNumber()
    @IsOptional()
    productID?: number;

    @ApiPropertyOptional({ example: "Phone", description: "Product name" })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: "This Phone is Black", description: "Product description" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 5000, description: "Product price" })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({ example: "http://example.com/image.jpg", description: "Image URL" })
    @IsString()
    @IsUrl()
    @IsOptional()
    imageURL?: string;
}
