// src/activity/activity.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { ActivityService } from './activity.service';


@ApiTags('activity')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
constructor(private readonly service: ActivityService) {}
@Get(':contactoId') list(@Param('contactoId') contactoId: string, @Query('limit') limit = 20) {
return this.service.list(+contactoId, Number(limit));
}
}