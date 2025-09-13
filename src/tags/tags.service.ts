// src/tags/tags.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';


@Injectable()
export class TagsService {
constructor(private readonly prisma: PrismaService) {}
create(dto: any) { return this.prisma.etiqueta.create({ data: dto }); }
list() { return this.prisma.etiqueta.findMany({ orderBy: { nombre: 'asc' } }); }
update(id: number, dto: any) { return this.prisma.etiqueta.update({ where: { id }, data: dto }); }
remove(id: number) { return this.prisma.etiqueta.delete({ where: { id } }); }
}