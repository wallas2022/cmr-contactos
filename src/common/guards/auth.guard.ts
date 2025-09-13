import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const req = context.switchToHttp().getRequest();
const auth = req.headers['authorization'] as string | undefined;
if (!auth || !auth.startsWith('Bearer ')) {
throw new UnauthorizedException('Falta token Bearer');
}
// TODO: validar JWT contra Keycloak (JWKS), y setear req.user con { sub, email, roles, tenant }
req.user = { sub: 'demo', tenant: req.headers['x-tenant'] || 1 };
return true;
}
}