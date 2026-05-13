import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSlotDto, UpdateSlotDto } from './dto';
import { Types } from 'mongoose';
import { SlotStatus } from '@shared/enums';
import { DoctorInRequest } from '@shared/interfaces';
import { SlotRepository } from '@db/repositories/slot';
import { FindAllOptionsDto } from '@common/dtos';

@Injectable()
export class SlotService {
  constructor(private readonly slotRepository: SlotRepository) {}
  createEmptySlot(doctor: DoctorInRequest, createSlotDto: CreateSlotDto) {
    return 'This action adds a new slot';
  }

  async getDoctorSlots(doctorId: Types.ObjectId, query: FindAllOptionsDto, status?: SlotStatus, ) {
    let message: string = 'Slots retrieved successfully';
    const slots = await this.slotRepository.findAllWithFilters(doctorId, query, status);
    if (!slots) message = 'No slots found with the given criteria';
    return { message, data: slots };
  }

  async getSlot(userId: Types.ObjectId, id: Types.ObjectId) {
    const slot = await this.slotRepository.findById(id);
    if (!slot) throw new NotFoundException('Slot not found');

    const isDoctor = slot.doctor.equals(userId);
    const isPatient = slot.patient?.equals(userId);
    if (!isDoctor && !isPatient) throw new ForbiddenException('You are not authorized to view this slot');

    return { message: 'Slot retrieved successfully', data: slot };
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
