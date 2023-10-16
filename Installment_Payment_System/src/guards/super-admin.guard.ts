import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isSuperAdmin = this.reflector.get<boolean>('isSuperAdmin', context.getHandler());
        if (isSuperAdmin) {
            const request = context.switchToHttp().getRequest();
            return request.admin.role === 'SUPERADMIN';
        }
        return true;
    }
}
