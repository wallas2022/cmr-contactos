// src/contacts/dto/advanced-search.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';


export class AdvancedSearchDto {
@ApiPropertyOptional() @IsOptional() @IsString() q?: string; // texto libre
@ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
@ApiPropertyOptional() @IsOptional() @IsString() telefono?: string;
@ApiPropertyOptional() @IsOptional() @IsString() etiqueta?: string; // nombre de etiqueta
@ApiPropertyOptional() @IsOptional() @IsString() ciudad?: string;
@ApiPropertyOptional() @IsOptional() @IsString() pais?: string;
@ApiPropertyOptional() @IsOptional() @IsDateString() cumpleDesde?: string;
@ApiPropertyOptional() @IsOptional() @IsDateString() cumpleHasta?: string;
}