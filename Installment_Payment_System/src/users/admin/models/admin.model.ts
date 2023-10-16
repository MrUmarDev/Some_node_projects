import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdmin {
    adminID: number;
    username: string;
    role: string;
    email: string;
    photoURL: string;
    hashed_password: string;
    hashed_refresh_token: string;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdmin> {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) adminID: number;

    @ApiProperty({ example: "admin123", description: "Admin username" })
    @Column({
        type: DataType.STRING,
        unique: true,
    }) username: string;

    @ApiProperty({ example: "superadmin", description: "Admin role" })
    @Column({
        type: DataType.STRING,
    }) role: string;

    @ApiProperty({ example: "admin@example.com", description: "Admin email address" })
    @Column({
        type: DataType.STRING,
        unique: true,
    }) email: string;

    @ApiProperty({ example: "http://example.com/photo.jpg", description: "Admin Photo URL" })
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

    @ApiProperty({ example: "activation_link", description: "Activation link" })
    @Column({
        type: DataType.STRING,
    }) activation_link: string;
}
