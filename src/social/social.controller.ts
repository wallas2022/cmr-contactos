import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { SocialService } from './social.services';
import { CreateSocialDto } from './dto/create-social.dto';

@ApiTags('social')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('social')
export class SocialController {
  constructor(private readonly service: SocialService) {}

  @Post(':contactoId')
  @ApiOkResponse({ description: 'Crea un perfil social para el contacto' })
  add(@Param('contactoId') contactoId: string, @Body() dto: CreateSocialDto) {
    return this.service.add(+contactoId, dto);
  }

  @Get(':contactoId')
  @ApiOkResponse({ description: 'Lista perfiles sociales del contacto' })
  list(@Param('contactoId') contactoId: string) {
    return this.service.list(+contactoId);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Elimina un perfil social por id' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
