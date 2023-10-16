import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: "Phone", description: "Product name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "This Phone is Black", description: "Product description" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 5000.0, description: "Product price" })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: "http://example.com/image.jpg", description: "Image URL" })
    @IsString()
    @IsUrl()
    imageURL: string;
}
