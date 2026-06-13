import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSlotDto, UpdateSlotDto } from './dto';
import { Types } from 'mongoose';
import { SlotStatus } from '@shared/enums';
import { FindAllOptionsDto } from '@common/dtos';
import { SlotsRepository } from './slots.repository';
import { MongoServerError } from 'mongodb';
import { PatientsService } from '@features/patients';

@Injectable()
export class SlotsService {
  constructor(private readonly slotsRepository: SlotsRepository, private readonly patientsService: PatientsService) {}
  async createEmptySlot(doctorId: Types.ObjectId, createSlotDto: CreateSlotDto) {
    try {
      const slot = await this.slotsRepository.create({ ...createSlotDto, doctor: doctorId, status: SlotStatus.AVAILABLE });
      return { message: 'Slot created successfully', data: slot };
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) throw new BadRequestException('You have already created a slot for this time range');
      throw error;
    }
  }

  async doctorGetOwnSlots(doctorId: Types.ObjectId, query: FindAllOptionsDto, status?: SlotStatus) {
    let message: string = 'Slots retrieved successfully';
    const slots = await this.slotsRepository.findAllWithFilters(doctorId, query, status);
    if (!slots) message = 'No slots found with the given criteria';
    return { message, data: slots };
  }

  async assignPatientToSlot(slotId: Types.ObjectId, patientId: Types.ObjectId) {
    const patient = await this.patientsService.findById(patientId);
    if (!patient) throw new NotFoundException('Patient not found');
    const result = await this.slotsRepository.updateOne({ _id: slotId, status: SlotStatus.AVAILABLE }, { status: SlotStatus.BOOKED, patient: patientId });
    if (result.matchedCount === 0) throw new BadRequestException('Slot is not available for booking');
    return { message: 'Patient assigned to slot successfully' };
  }

  async getDoctorFreeSlots(id: Types.ObjectId) {
    let message: string = 'Free slots retrieved successfully';
    const slots = await this.slotsRepository.findMany({ doctor: id, status: SlotStatus.AVAILABLE });
    if (!slots) message = 'No free slots found for this doctor';
    return { message, data: slots };
  }

  async getSlot(userId: Types.ObjectId, id: Types.ObjectId) {
    const slot = await this.slotsRepository.findById(id);
    if (!slot) throw new NotFoundException('Slot not found');

    const isDoctor = slot.doctor.equals(userId);
    const isPatient = slot.patient?.equals(userId);
    if (!isDoctor && !isPatient) throw new ForbiddenException('You are not authorized to view this slot');

    return { message: 'Slot retrieved successfully', data: slot };
  }

  async bookSlot(slotId: Types.ObjectId, patientId: Types.ObjectId) {
    const result = await this.slotsRepository.updateOne({ _id: slotId, status: SlotStatus.AVAILABLE }, { status: SlotStatus.BOOKED, patient: patientId });
    if (result.matchedCount === 0) throw new BadRequestException('Slot is not available for booking');
    return { message: 'Slot booked successfully' };
  }

  async updateSlot(doctorId: Types.ObjectId, slotId: Types.ObjectId, updateSlotDto: UpdateSlotDto) {
    const result = await this.slotsRepository.updateOne({ _id: slotId, doctor: doctorId }, updateSlotDto);
    if (result.matchedCount === 0) throw new NotFoundException('Slot not found or you are not the owner');
    return { message: 'Slot updated successfully' };
  }

  async cancelSlot(slotId: Types.ObjectId, patientId: Types.ObjectId) {
    const result = await this.slotsRepository.updateOne(
      { _id: slotId, status: SlotStatus.BOOKED, patient: patientId },
      { status: SlotStatus.AVAILABLE, $unset: { patient: '' } },
    );
    if (result.matchedCount === 0) throw new BadRequestException('Slot is not booked by you or already cancelled');
    return { message: 'Slot cancelled successfully' };
  }

  async deleteSlot(id: Types.ObjectId) {
    const result = await this.slotsRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) throw new NotFoundException('Slot not found');
    return { message: 'Slot deleted successfully' };
  }
}
