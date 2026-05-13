import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '@shared/enums';
import { SlotSchema } from '@db/schemas';
import { SlotRepository } from '@db/repositories';

@Module({
  imports:[MongooseModule.forFeature([{ name: ModelName.SLOT, schema: SlotSchema }])],
  controllers: [SlotController],
  providers: [SlotService, SlotRepository],
  exports: [SlotService, SlotRepository],
})
export class SlotModule {}
