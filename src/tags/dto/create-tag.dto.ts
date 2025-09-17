import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'VIP', description: 'Nombre de la etiqueta' })
  @IsString()
  @MaxLength(50)
  nombre!: string;

  @ApiPropertyOptional({ example: '#FF5733', description: 'Color en formato HEX' })
  @IsOptional()
  @IsString()
  @MaxLength(7)
  colorHex?: string;
}
