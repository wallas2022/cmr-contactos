// src/import-export/import-export.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { parse } from 'csv-parse/sync';
import { Multer } from 'multer';
import * as Express from 'express';


@Injectable()
export class ImportExportService {
constructor(private readonly prisma: PrismaService) {}

async importCsv(file: Multer.File) {

const records: any[] = parse(file.buffer, { columns: true, skip_empty_lines: true });
const created: number[] = [];
for (const r of records) {
const c = await this.prisma.contacto.create({
data: {
empresaId: Number(r.empresaId ?? 1),
nombres: r.nombres,
apellidos: r.apellidos,
email: r.email || null,
telefono: r.telefono || null,
ciudad: r.ciudad || null,
pais: r.pais || null,
},
});
created.push(c.id);
}
return { imported: created.length, ids: created };
}


async exportCsv(etiqueta?: string) {
const rows = await this.prisma.contacto.findMany({
where: etiqueta ? { etiquetas: { some: { etiqueta: { nombre: etiqueta } } } } : {},
orderBy: { id: 'asc' },
});
const header = 'id,empresaId,nombres,apellidos,email,telefono,ciudad,pais\n';
const body = rows
.map((r) => [r.id, r.empresaId, r.nombres, r.apellidos, r.email ?? '', r.telefono ?? '', r.ciudad ?? '', r.pais ?? ''].join(','))
.join('\n');
return header + body + '\n';
}
}