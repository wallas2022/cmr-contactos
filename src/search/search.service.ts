// src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';


@Injectable()
export class SearchService {
constructor(private readonly prisma: PrismaService) {}
fullText(q?: string) {
if (!q) return this.prisma.contacto.findMany({ take: 50, orderBy: { updatedAt: 'desc' } });
return this.prisma.contacto.findMany({
where: {
OR: [
{ nombres: { contains: q } },
{ apellidos: { contains: q } },
{ email: { contains: q } },
{ telefono: { contains: q } },
{ notas: { contains: q } },
],
},
take: 50,
orderBy: { updatedAt: 'desc' },
});
}
}