// src/contacts/contacts.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';


@ApiTags('contactos')
//@ApiBearerAuth()
//@UseGuards(AuthGuard)
@Controller('contacts')
export class ContactsController {
constructor(private readonly service: ContactsService) {}


@Post()
create(@Body() dto: CreateContactDto) {
return this.service.create(dto);
}


@Get()
findAll(@Query() { page, limit }: PaginationDto) {
return this.service.findAll({ page, limit });
}


@Get('search')
search(@Query() query: AdvancedSearchDto) {
return this.service.advancedSearch(query);
}


@Get(':id')
findOne(@Param('id') id: string) {
return this.service.findOne(+id);
}

@Get('tag/:tagId')
findByTag(@Param('tagId') tagId: string, @Query() { page, limit }: PaginationDto) {
return this.service.findByTag(+tagId, { page, limit });
}


@Patch(':id')
update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
return this.service.update(+id, dto);
}


@Delete(':id')
remove(@Param('id') id: string) {
return this.service.remove(+id);
}
}