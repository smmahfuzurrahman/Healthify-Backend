import { model, Schema } from 'mongoose';
import { TBloodPressure } from './BloodPressure.interface';

const bloodPressureSchema = new Schema<TBloodPressure>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const BloodPressure = model<TBloodPressure>(
  'BloodPressure',
  bloodPressureSchema,
);
