import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateSlotDto {
  @IsNotEmpty()
  @IsDateString()
  from!: Date;

  @IsNotEmpty()
  @IsDateString()
  to!: Date;
}
