import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateSessionSlotsDto {
  @IsNotEmpty()
  @IsDateString()
  from!: Date;

  @IsNotEmpty()
  @IsDateString()
  to!: Date;
}
