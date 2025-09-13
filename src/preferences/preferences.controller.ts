// src/preferences/preferences.controller.ts
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { PreferencesService } from './preferences.service';


@ApiTags('preferencias')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('preferences')
export class PreferencesController {
constructor(private readonly service: PreferencesService) {}
@Post(':contactoId') upsert(@Param('contactoId') contactoId: string, @Body() dto: any) { return this.service.upsert(+contactoId, dto); }
@Get(':contactoId') get(@Param('contactoId') contactoId: string) { return this.service.get(+contactoId); }
}