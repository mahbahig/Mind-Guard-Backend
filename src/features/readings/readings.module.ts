import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingsRepository } from './readings.repository';
import { READING_MODEL_NAME, ReadingSchema } from './reading.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: READING_MODEL_NAME, schema: ReadingSchema }])],
  controllers: [ReadingsController],
  providers: [ReadingsService, ReadingsRepository],
  exports: [ReadingsService, ReadingsRepository],
})
export class ReadingsModule {}
