import { Types } from 'mongoose';

export type TReport = {
  userId: Types.ObjectId;
  prescriptionImg: string;
  doctorName: string;
  doctorNumber: number;
  symptom: string;
  appointment: Date;
  reportImg: string;
};
