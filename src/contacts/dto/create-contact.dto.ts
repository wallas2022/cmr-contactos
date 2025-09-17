import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';


export class CreateContactDto {
@ApiProperty() @IsInt() empresaId: number;
@ApiProperty() @IsString() @MaxLength(120) nombres: string;
@ApiProperty() @IsString() @MaxLength(120) apellidos: string;
@ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
@ApiPropertyOptional() @IsOptional() @IsString() telefono?: string;
@ApiPropertyOptional() @IsOptional() @IsString() direccion?: string;
@ApiPropertyOptional() @IsOptional() @IsString() ciudad?: string;
@ApiPropertyOptional() @IsOptional() @IsString() pais?: string;
@ApiPropertyOptional() @IsOptional() cumpleanios?: string;
@ApiPropertyOptional() @IsOptional() aniversario?: string;
@ApiPropertyOptional({ type: [Number] }) @IsOptional() etiquetasIds?: number[];
@ApiPropertyOptional() @IsOptional() notas?: string;
}