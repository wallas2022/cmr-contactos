// src/interactions/interactions.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';


@Injectable()
export class InteractionsService {
constructor(private readonly prisma: PrismaService) {}


async create(contactoId: number, dto: any) {
const item = await this.prisma.interaccion.create({ data: { contactoId, ...dto } });
await this.prisma.actividad.create({ data: { contactoId, tipo: 'NEW_INTERACTION' } });
return item;
}


async list(contactoId: number, tipo?: string) {
return this.prisma.interaccion.findMany({
where: { contactoId, ...(tipo ? { tipo: tipo as any } : {}) },
orderBy: { ocurridaEn: 'desc' },
});
}


async update(id: number, dto: any) { return this.prisma.interaccion.update({ where: { id }, data: dto }); }
async remove(id: number) { return this.prisma.interaccion.delete({ where: { id } }); }
}