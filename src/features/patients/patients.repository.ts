import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from '@database';
import { Patient, PATIENT_MODEL_NAME, PatientDocument } from './patient.schema';
import { USER_MODEL_NAME, UserDocument } from '@features/users/user.schema';
import { READING_MODEL_NAME, ReadingDocument } from '@features/readings/reading.schema';
import { ReadingType } from '@shared/enums';

type ReadingRecord = {
  _id: Types.ObjectId;
  createdAt?: Date;
  patient: Types.ObjectId;
  type: string;
  updatedAt?: Date;
  value: string;
};

type PatientRecord = Patient & {
  createdAt?: Date;
  updatedAt?: Date;
};

type PatientWithInsights = PatientRecord & {
  user: {
    _id: Types.ObjectId;
    dateOfBirth?: Date;
    name?: string;
    email?: string;
    gender?: string;
  } | null;
  metrics: {
    latestMood: ReadingRecord | null;
    latestHrv: ReadingRecord | null;
    latestHeartRate: ReadingRecord | null;
    latestReadingAt: Date | null;
    moodHistory: ReadingRecord[];
  };
};

@Injectable()
export class PatientsRepository extends BaseRepository<Patient> {
  constructor(
    @InjectModel(PATIENT_MODEL_NAME) private readonly patientModel: Model<PatientDocument>,
    @InjectModel(USER_MODEL_NAME) private readonly userModel: Model<UserDocument>,
    @InjectModel(READING_MODEL_NAME) private readonly readingModel: Model<ReadingDocument>,
  ) {
    super(patientModel);
  }

  async findDoctorPatientsWithInsights(doctorId: Types.ObjectId): Promise<PatientWithInsights[]> {
    const patients = (await this.patientModel
      .find({ treatingDoctor: doctorId })
      .lean()
      .exec()) as PatientRecord[];
    if (!patients.length) return [];

    const patientIds = patients.map((patient) => patient._id);
    const [users, readings] = await Promise.all([
      this.userModel
        .find(
          { _id: { $in: patientIds } },
          { _id: 1, name: 1, email: 1, gender: 1, dateOfBirth: 1 },
        )
        .lean()
        .exec(),
      this.readingModel
        .find(
          { patient: { $in: patientIds } },
          { _id: 1, patient: 1, type: 1, value: 1, createdAt: 1, updatedAt: 1 },
        )
        .sort({ createdAt: -1, _id: -1 })
        .lean()
        .exec(),
    ]);

    const usersById = new Map(users.map((user) => [String(user._id), user]));
    const readingsByPatient = new Map<string, ReadingRecord[]>();

    for (const reading of readings) {
      const key = String(reading.patient);
      const existing = readingsByPatient.get(key);
      if (existing) existing.push(reading);
      else readingsByPatient.set(key, [reading]);
    }

    return patients.map((patient) => {
      const patientReadings = (readingsByPatient.get(String(patient._id)) ||
        []) as ReadingRecord[];
      const latestMood =
        patientReadings.find((reading) => reading.type === ReadingType.MOOD) || null;
      const latestHrv =
        patientReadings.find((reading) => reading.type === ReadingType.HRV) || null;
      const latestHeartRate =
        patientReadings.find((reading) => reading.type === ReadingType.HEART_RATE) || null;
      const moodHistory = patientReadings
        .filter((reading) => reading.type === ReadingType.MOOD)
        .slice(0, 7)
        .reverse();
      const latestReading = patientReadings[0];

      return {
        ...patient,
        user: usersById.get(String(patient._id)) || null,
        metrics: {
          latestMood,
          latestHrv,
          latestHeartRate,
          latestReadingAt:
            latestReading?.createdAt || latestReading?.updatedAt || patient.updatedAt || null,
          moodHistory,
        },
      };
    });
  }
}
