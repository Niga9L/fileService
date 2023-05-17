import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  offset = 0;

  @IsOptional()
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  @IsPositive()
  limit = 15;
}
