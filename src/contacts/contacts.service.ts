import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    const { etiquetasIds = [], ...rest } = dto as any;

    const contacto = await this.prisma.contacto.create({
      data: {
        ...rest,
        etiquetas: Array.isArray(etiquetasIds) && etiquetasIds.length
          ? { createMany: { data: etiquetasIds.map((id: number) => ({ etiquetaId: id })) } }
          : undefined,
      },
      include: { etiquetas: { include: { etiqueta: true } }, preferencias: true },
    });

    await this.prisma.actividad.create({
      data: { contactoId: contacto.id, tipo: 'CREATED_CONTACT', detalle: 'Alta de contacto' },
    });

    return contacto;
  }

  async findAll({ page = 1, limit = 20 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.contacto.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { etiquetas: { include: { etiqueta: true } }, preferencias: true },
      }),
      this.prisma.contacto.count(),
    ]);

    return { items, page, limit, total };
  }

  async findOne(id: number) {
    const contacto = await this.prisma.contacto.findUnique({
      where: { id },
      include: {
        etiquetas: { include: { etiqueta: true } },
        preferencias: true,
        perfiles: true,
      },
    });
    if (!contacto) throw new NotFoundException('Contacto no encontrado');
    return contacto;
  }

  async update(id: number, dto: UpdateContactDto) {
    const exists = await this.prisma.contacto.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contacto no encontrado');

    const { etiquetasIds, ...rest } = dto as any;

    const updated = await this.prisma.contacto.update({
      where: { id },
      data: {
        ...rest,
        ...(Array.isArray(etiquetasIds)
          ? {
              etiquetas: {
                deleteMany: { contactoId: id },
                createMany: { data: etiquetasIds.map((e: number) => ({ etiquetaId: e })) },
              },
            }
          : {}),
      },
      include: { etiquetas: { include: { etiqueta: true } }, preferencias: true },
    });

    await this.prisma.actividad.create({
      data: { contactoId: id, tipo: 'UPDATED_CONTACT', detalle: 'Actualización de contacto' },
    });

    return updated;
  }

  async remove(id: number) {
    const exists = await this.prisma.contacto.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contacto no encontrado');

    await this.prisma.contacto.delete({ where: { id } });
    await this.prisma.actividad.create({
      data: { contactoId: id, tipo: 'DELETED_CONTACT', detalle: 'Baja de contacto' },
    });

    return { id };
  }

  async advancedSearch(q: AdvancedSearchDto) {
    const { q: text, email, telefono, etiqueta, ciudad, pais, cumpleDesde, cumpleHasta } = q;

    return this.prisma.contacto.findMany({
      where: {
        AND: [
          text
            ? {
                OR: [
                  { nombres: { contains: text } },
                  { apellidos: { contains: text } },
                  { notas: { contains: text } },
                  { email: { contains: text } },
                  { telefono: { contains: text } },
                ],
              }
            : {},
          email ? { email: { contains: email } } : {},
          telefono ? { telefono: { contains: telefono } } : {},
          ciudad ? { ciudad: { contains: ciudad } } : {},
          pais ? { pais: { contains: pais } } : {},
          etiqueta
            ? { etiquetas: { some: { etiqueta: { nombre: { equals: etiqueta } } } } }
            : {},
          cumpleDesde || cumpleHasta
            ? {
                cumpleanios: {
                  gte: cumpleDesde ? new Date(cumpleDesde) : undefined,
                  lte: cumpleHasta ? new Date(cumpleHasta) : undefined,
                },
              }
            : {},
        ],
      },
      include: { etiquetas: { include: { etiqueta: true } }, preferencias: true },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
