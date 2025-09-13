// src/alerts/alerts.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { AlertsService } from './alerts.service';


@ApiTags('alerts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('alerts')
export class AlertsController {
constructor(private readonly service: AlertsService) {}
@Get('upcoming') upcoming(@Query('days') days = 14) { return this.service.upcoming(Number(days)); }
}