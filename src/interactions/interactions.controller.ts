// src/interactions/interactions.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { InteractionsService } from './interactions.service';


@ApiTags('interacciones')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('interactions')
export class InteractionsController {
constructor(private readonly service: InteractionsService) {}


@Post(':contactoId')
create(@Param('contactoId') contactoId: string, @Body() body: any) {
return this.service.create(+contactoId, body);
}


@Get(':contactoId')
list(@Param('contactoId') contactoId: string, @Query('tipo') tipo?: string) {
return this.service.list(+contactoId, tipo);
}


@Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }
@Delete(':id') remove(@Param('id') id: string) { return this.service.remove(+id); }
}