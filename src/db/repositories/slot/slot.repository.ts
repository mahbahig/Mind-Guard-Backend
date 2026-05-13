import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter, Types } from 'mongoose';
import { ModelName, SlotStatus } from '@shared/enums';
import { Slot } from '@db/schemas/slot';
import { FindAllOptionsDto } from '@common/dtos';

@Injectable()
export class SlotRepository extends AbstractRepository<Slot> {
  constructor(@InjectModel(ModelName.SLOT) private readonly slotModel: Model<Slot>) {
    super(slotModel);
  }

  getDoctorSlots(doctorId: Types.ObjectId, status?: SlotStatus) {
    const filter: QueryFilter<Slot> = { doctor: doctorId };
    if (status) filter.status = status;
    return this.findMany({ ...filter });
  }

  findAllWithFilters(doctorId: Types.ObjectId, options: FindAllOptionsDto, status?: SlotStatus) {
    const MAX_LIMIT = 1000;

    const filter: QueryFilter<Slot> = { doctor: doctorId };

    if (options.from || options.to) {
      filter.createdAt = {};
      if (options.from) filter.createdAt.$gte = options.from;
      if (options.to) filter.createdAt.$lte = options.to;
    }
    if (status) filter.status = status;

    const limit = options.all ? MAX_LIMIT : options.limit;
    const skip = options.all ? 0 : (options.page - 1) * options.limit;

    return this.slotModel
      .find(filter)
      .sort({ [options.sortBy]: options.sortOrder })
      .skip(skip)
      .limit(limit);
  }
}
