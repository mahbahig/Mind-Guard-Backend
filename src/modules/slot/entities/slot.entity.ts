import { Types } from 'mongoose';
import { SlotStatus } from '@shared/enums';

export class SlotEntity {
  doctor!: Types.ObjectId;
  patient!: null;
  startTime!: Date;
  endTime!: Date;
  status!: SlotStatus;
}
