import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modelNames } from 'mongoose';
import { ModelName } from '@shared/enums';
import { ReadingSchema } from '@db/schemas';
import { ReadingRepository } from '@db/repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: ModelName.READING, schema: ReadingSchema }])],
  controllers: [ReadingController],
  providers: [ReadingService, ReadingRepository],
  exports: [ReadingService, ReadingRepository],
})
export class ReadingModule {}
