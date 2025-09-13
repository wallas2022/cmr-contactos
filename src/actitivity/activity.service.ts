// src/activity/activity.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services'


@Injectable()
export class ActivityService {
constructor(private readonly prisma: PrismaService) {}
list(contactoId: number, limit = 20) {
return this.prisma.actividad.findMany({ where: { contactoId }, orderBy: { ocurridaEn: 'desc' }, take: limit });
}
}