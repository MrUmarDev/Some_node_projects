import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../users/admin/models/admin.model";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}
    async getAdminTokens(admin: Admin) {
        const jwtPayload = {
            id: admin.id,
            role: admin.role,
        };
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }
}
