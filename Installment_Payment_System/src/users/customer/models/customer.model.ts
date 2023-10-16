import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICustomer {
    customerID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    photoURL: string;
    passport: string;
    hashed_password: string;
    hashed_refresh_token: string;
}

@Table({tableName: "customer"})
export class Customer extends Model<Customer, ICustomer> {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) customerID: number;

    @ApiProperty({ example: "Tom", description: "First name" })
    @Column({
        type: DataType.STRING,
    }) firstName: string;

    @ApiProperty({ example: "Bill", description: "Last name" })
    @Column({
        type: DataType.STRING,
    }) lastName: string;

    @ApiProperty({ example: "tom.bill@example.com", description: "Email address" })
    @Column({
        type: DataType.STRING,
        unique: true,
    }) email: string;

    @ApiProperty({ example: "1234567890", description: "Phone number" })
    @Column({
        type: DataType.STRING,
    }) phone: string;

    @ApiProperty({ example: "123 Main St, City, Country", description: "Address" })
    @Column({
        type: DataType.STRING,
    }) address: string;

    @ApiProperty({ example: "http://example.com/photo.jpg", description: "Photo URL" })
    @Column({
        type: DataType.STRING,
    }) photoURL: string;

    @ApiProperty({ example: "AB1234567", description: "Passport number" })
    @Column({
        type: DataType.STRING,
        unique: true,
    }) passport: string;

    @ApiProperty({ example: "hashed_password", description: "Hashed password" })
    @Column({
        type: DataType.STRING,
    }) hashed_password: string;

    @ApiProperty({ example: "hashed_refresh_token", description: "Hashed refresh token" })
    @Column({
        type: DataType.STRING,
    }) hashed_refresh_token: string;
}
