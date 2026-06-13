import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotsRepository } from './slots.repository';
import { SLOT_MODEL_NAME, SlotSchema } from './slot.schema';
import { PatientsModule } from '@features/patients';
@Module({
  imports: [MongooseModule.forFeature([{ name: SLOT_MODEL_NAME, schema: SlotSchema }]), PatientsModule],
  controllers: [SlotsController],
  providers: [SlotsService, SlotsRepository],
  exports: [SlotsService, SlotsRepository],
})
export class SlotsModule {}
