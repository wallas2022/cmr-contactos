// src/alerts/alerts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';


@Injectable()
export class AlertsService {
constructor(private readonly prisma: PrismaService) {}


async upcoming(days: number) {
const now = new Date();
const end = new Date();
end.setDate(now.getDate() + days);


// Comparación mes/día (ignorando año) para cumpleanios y aniversario
const contacts = await this.prisma.contacto.findMany({
where: {
OR: [
{ cumpleanios: { not: null } },
{ aniversario: { not: null } },
],
},
});


const inRange = (d?: Date | null) => {
if (!d) return false;
const test = new Date(now.getFullYear(), d.getMonth(), d.getDate());
return test >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && test <= end;
};


const result = contacts
.map((c) => ({
id: c.id,
nombre: `${c.nombres} ${c.apellidos}`,
cumpleanios: c.cumpleanios && inRange(c.cumpleanios) ? c.cumpleanios : null,
aniversario: c.aniversario && inRange(c.aniversario) ? c.aniversario : null,
}))
.filter((x) => x.cumpleanios || x.aniversario);


return { rangeDays: days, events: result };
}
}