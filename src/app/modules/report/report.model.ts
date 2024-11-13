import { model, Schema } from 'mongoose';
import { TReport } from './report.interface';

const reportSchema = new Schema<TReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    prescriptionImg: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorNumber: {
      type: Number,
      required: true,
    },
    appointment: {
      type: Date,
      required: true,
    },
    reportImg: {
      type: String,
      required: true,
    },
    symptom: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Report = model<TReport>('Report', reportSchema);
