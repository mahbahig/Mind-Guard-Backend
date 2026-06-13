import { IsDateString, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SlotStatus } from '@shared/enums';

export class CreateSlotDto {
  @IsOptional()
  @IsMongoId()
  doctor?: string;

  @IsOptional()
  @IsMongoId()
  doctorId?: string;

  @IsOptional()
  @IsMongoId()
  patient?: string;

  @IsOptional()
  @IsMongoId()
  patientId?: string;

  @IsOptional()
  @IsString()
  patientEmail?: string;

  @IsOptional()
  @IsString()
  patientName?: string;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  endTime!: string;

  @IsOptional()
  @IsEnum(SlotStatus)
  status?: SlotStatus;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  doctorNote?: string;

  @IsOptional()
  @IsDateString()
  bookedAt?: string;

  @IsOptional()
  @IsDateString()
  cancelledAt?: string;

  @IsOptional()
  @IsString()
  cancelledBy?: string;

  @IsOptional()
  @IsMongoId()
  rescheduledTo?: string;
}
