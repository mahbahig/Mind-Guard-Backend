import { IsDateString, IsOptional } from 'class-validator';
import { PaginationOptionsDto } from './pagination-options.dto';

export class FindAllOptionsDto extends PaginationOptionsDto {
  @IsOptional()
  @IsDateString()
  from?: Date;

  @IsOptional()
  @IsDateString()
  to?: Date;
}
