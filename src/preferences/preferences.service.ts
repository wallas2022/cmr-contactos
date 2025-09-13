// src/preferences/preferences.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';


@Injectable()
export class PreferencesService {
constructor(private readonly prisma: PrismaService) {}
upsert(contactoId: number, dto: any) {
return this.prisma.preferencia.upsert({
where: { contactoId },
create: { contactoId, ...dto },
update: dto,
});
}
get(contactoId: number) { return this.prisma.preferencia.findUnique({ where: { contactoId } }); }
}