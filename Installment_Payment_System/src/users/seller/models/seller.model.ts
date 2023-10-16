import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISeller {
    sellerID: number;
    name: string;
    email: string;
    photoURL: string;
    hashed_password: string;
    hashed_refresh_token: string;
}

@Table({ tableName: "seller" })
export class Seller extends Model<Seller, ISeller> {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }) sellerID: number;

    @ApiProperty({ example: "Tom Bill", description: "Seller name" })
    @Column({
        type: DataType.STRING,
    }) name: string;

    @ApiProperty({ example: "seller@example.com", description: "Seller email address" })
    @Column({
        type: DataType.STRING,
        unique: true,
    }) email: string;

    @ApiProperty({ example: "http://example.com/seller.jpg", description: "Seller Photo URL" })
    @Column({
        type: DataType.STRING,
    }) photoURL: string;

    @ApiProperty({ example: "hashed_password", description: "Hashed password" })
    @Column({
        type: DataType.STRING,
    }) hashed_password: string;

    @ApiProperty({ example: "hashed_refresh_token", description: "Hashed refresh token" })
    @Column({
        type: DataType.STRING,
    }) hashed_refresh_token: string;
}
