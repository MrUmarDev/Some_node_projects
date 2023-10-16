import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IProduct {
    productID: number;
    name: string;
    description: string;
    price: number;
    imageURL: string;
}

@Table({ tableName: "product" })
export class Product extends Model<Product, IProduct> {
    @ApiProperty({ example: 1, description: "Unique Id" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) productID: number;

    @ApiProperty({ example: "Phone", description: "Product name" })
    @Column({
        type: DataType.STRING,
    }) name: string;

    @ApiProperty({ example: "This Phone is Black", description: "Product description" })
    @Column({
        type: DataType.TEXT,
    }) description: string;

    @ApiProperty({ example: 5000.0, description: "Product price" })
    @Column({
        type: DataType.DECIMAL(10, 2),
    }) price: number;

    @ApiProperty({ example: "http://example.com/image.jpg", description: "Image URL" })
    @Column({
        type: DataType.STRING,
    }) imageURL: string;
}
