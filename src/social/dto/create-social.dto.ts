import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSocialDto {
  @ApiProperty({ example: 'linkedin', description: 'Nombre de la red social' })
  @IsString()
  @MaxLength(50)
  red!: string;

  @ApiPropertyOptional({ example: 'walter-rosales', description: 'Handle o usuario' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  usuario?: string;

  @ApiPropertyOptional({ example: 'https://www.linkedin.com/in/walter-rosales' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  url?: string;
}
