import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Customer } from "../users/customer/models/customer.model";

@Injectable()
export class CustomerGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Customer Unauthorized');
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Customer Unauthorized');
        }

        try {
            const customer: Partial<Customer> = await this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY,
            });

            if (!customer) {
                throw new UnauthorizedException('Invalid token');
            }
            req.customer = customer;

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
