import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const Empresa = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
const request = ctx.switchToHttp().getRequest();
return Number(request.user?.tenant ?? 1);
});