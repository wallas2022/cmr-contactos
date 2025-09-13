// src/social/social.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';


@Injectable()
export class SocialService {
constructor(private readonly prisma: PrismaService) {}
add(contactoId: number, dto: any) { return this.prisma.perfilSocial.create({ data: { contactoId, ...dto } }); }
list(contactoId: number) { return this.prisma.perfilSocial.findMany({ where: { contactoId } }); }
remove(id: number) { return this.prisma.perfilSocial.delete({ where: { id } }); }
}