// src/tags/tags.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { TagsService } from './tags.service';


@ApiTags('etiquetas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tags')
export class TagsController {
constructor(private readonly service: TagsService) {}
@Post() create(@Body() body: any) { return this.service.create(body); }
@Get() list() { return this.service.list(); }
@Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }
@Delete(':id') remove(@Param('id') id: string) { return this.service.remove(+id); }
}