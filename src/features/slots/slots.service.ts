import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSlotDto, UpdateSlotDto } from './dto';
import { Types } from 'mongoose';
import { SlotStatus, UserRole } from '@shared/enums';
import { DoctorInRequest, UserInRequest } from '@shared/interfaces';
import { FindAllOptionsDto } from '@common/dtos';
import { SlotsRepository } from './slots.repository';
import { Slot } from './slot.schema';

function objectIdValue(value?: string) {
  return value && Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : undefined;
}

function dateValue(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function cleanUpdate(update: Partial<Slot>) {
  Object.keys(update).forEach((key) => {
    const typedKey = key as keyof Slot;
    if (update[typedKey] === undefined) delete update[typedKey];
  });
  return update;
}

@Injectable()
export class SlotsService {
  constructor(private readonly slotsRepository: SlotsRepository) {}
  async createEmptySlot(doctor: DoctorInRequest, createSlotDto: CreateSlotDto) {
    const startTime = new Date(createSlotDto.startTime);
    const endTime = new Date(createSlotDto.endTime);
    if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime()) || endTime <= startTime) {
      throw new BadRequestException('Session end time must be after the start time');
    }

    const patient = objectIdValue(createSlotDto.patient || createSlotDto.patientId);
    const status = createSlotDto.status || SlotStatus.AVAILABLE;
    const slot = await this.slotsRepository.create({
      doctor: doctor._id,
      patient: patient || null,
      startTime,
      endTime,
      status,
      patientEmail: createSlotDto.patientEmail,
      patientName: createSlotDto.patientName,
      type: createSlotDto.type,
      reason: createSlotDto.reason,
      notes: createSlotDto.notes,
      doctorNote: createSlotDto.doctorNote || createSlotDto.notes,
      bookedAt: dateValue(createSlotDto.bookedAt) || (status === SlotStatus.BOOKED ? new Date() : undefined),
    });

    return { message: 'Slot created successfully', data: slot };
  }

  async getDoctorSlots(doctorId: Types.ObjectId, query: FindAllOptionsDto, status?: SlotStatus) {
    let message: string = 'Slots retrieved successfully';
    const slots = await this.slotsRepository.findAllWithFilters(doctorId, query, status);
    if (!slots) message = 'No slots found with the given criteria';
    return { message, data: slots };
  }

  async getDoctorAvailableSlots(doctorId: Types.ObjectId, query: FindAllOptionsDto, status?: SlotStatus) {
    return this.getDoctorSlots(doctorId, query, status || SlotStatus.AVAILABLE);
  }

  async getPatientSlots(patientId: Types.ObjectId) {
    const slots = await this.slotsRepository.findPatientSlots(patientId);
    return { message: 'Patient slots retrieved successfully', data: slots };
  }

  async getSlot(user: UserInRequest, id: Types.ObjectId) {
    const slot = await this.slotsRepository.findById(id);
    if (!slot) throw new NotFoundException('Slot not found');

    const isDoctor = slot.doctor.equals(user._id);
    const isPatient = slot.patient?.equals(user._id);
    const canPatientViewAvailableSlot =
      user.role === UserRole.PATIENT && !slot.patient && slot.status === SlotStatus.AVAILABLE;
    if (!isDoctor && !isPatient && !canPatientViewAvailableSlot) {
      throw new ForbiddenException('You are not authorized to view this slot');
    }

    return { message: 'Slot retrieved successfully', data: slot };
  }

  async update(user: UserInRequest, id: Types.ObjectId, updateSlotDto: UpdateSlotDto) {
    const slot = await this.slotsRepository.findById(id);
    if (!slot) throw new NotFoundException('Slot not found');

    const isDoctor = slot.doctor.equals(user._id);
    const nextStatus = updateSlotDto.status || slot.status;
    const isPatientOwner = slot.patient?.equals(user._id);
    const isPatientBookingAvailableSlot = user.role === UserRole.PATIENT && !slot.patient && nextStatus === SlotStatus.BOOKED;
    if (!isDoctor && !isPatientOwner && !isPatientBookingAvailableSlot) {
      throw new ForbiddenException('You are not authorized to update this slot');
    }
    if (isPatientBookingAvailableSlot && slot.status !== SlotStatus.AVAILABLE) {
      throw new BadRequestException('This slot is no longer available');
    }

    const requestedPatient = objectIdValue(updateSlotDto.patient || updateSlotDto.patientId);
    const patient = isPatientBookingAvailableSlot ? user._id : requestedPatient || slot.patient;
    const bookedAt = dateValue(updateSlotDto.bookedAt) || slot.bookedAt || (nextStatus === SlotStatus.BOOKED ? new Date() : undefined);
    const update = cleanUpdate({
      patient,
      patientEmail: updateSlotDto.patientEmail,
      patientName: updateSlotDto.patientName,
      status: nextStatus,
      type: updateSlotDto.type,
      reason: updateSlotDto.reason,
      notes: updateSlotDto.notes,
      doctorNote: updateSlotDto.doctorNote || updateSlotDto.notes,
      bookedAt,
      cancelledAt: dateValue(updateSlotDto.cancelledAt) || slot.cancelledAt,
      cancelledBy: updateSlotDto.cancelledBy,
      rescheduledTo: objectIdValue(updateSlotDto.rescheduledTo) || slot.rescheduledTo,
      sessionUpdatedAt: new Date(),
    });

    const updated = await this.slotsRepository.updateSlot(id, update);
    return { message: 'Slot updated successfully', data: updated };
  }

  async remove(doctorId: Types.ObjectId, id: Types.ObjectId) {
    const slot = await this.slotsRepository.findById(id);
    if (!slot) throw new NotFoundException('Slot not found');
    if (!slot.doctor.equals(doctorId)) throw new ForbiddenException('You are not authorized to delete this slot');
    const deleted = await this.slotsRepository.deleteSlot(id);
    return { message: 'Slot deleted successfully', data: deleted };
  }
}
