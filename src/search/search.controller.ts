// src/search/search.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { SearchService } from './search.service';


@ApiTags('search')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('search')
export class SearchController {
constructor(private readonly service: SearchService) {}
@Get('contacts')
run(@Query('q') q?: string) { return this.service.fullText(q); }
}