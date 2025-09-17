import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'VIP' })
  nombre!: string;

  @ApiPropertyOptional({ example: '#FF5733' })
  colorHex?: string;

  @ApiProperty({ example: '2025-09-12T10:30:00.000Z' })
  createdAt!: Date;
}
