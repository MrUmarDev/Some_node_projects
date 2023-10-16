import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Seller } from "../users/seller/models/seller.model";

@Injectable()
export class SellerGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Seller Unauthorized');
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Seller Unauthorized');
        }

        try {
            const seller: Partial<Seller> = await this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY,
            });

            if (!seller) {
                throw new UnauthorizedException('Invalid token');
            }
            req.seller = seller;
            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
