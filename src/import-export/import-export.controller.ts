// src/import-export/import-export.controller.ts
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Res, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../common/guards/auth.guard';
import { ImportExportService } from './import-export.service';
import type { Response } from 'express';
import { Multer } from 'multer';


@ApiTags('import-export')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('import-export')
export class ImportExportController {
constructor(private readonly service: ImportExportService) {}


@Post('import/csv')
@ApiConsumes('multipart/form-data')
@ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
importCsv(@UploadedFile() file: Multer.File) {
return this.service.importCsv(file);
}
@Get('export/csv')
@ApiOkResponse({ description: 'CSV descargable' })
async exportCsv(@Res() res: Response, @Query('etiqueta') etiqueta?: string) {
	const csv = await this.service.exportCsv(etiqueta);
	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', 'attachment; filename="contactos.csv"');
	res.send(csv);
}
}