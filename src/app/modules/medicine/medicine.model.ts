import { model, Schema } from 'mongoose';
import { TMedicine } from './medicine.interface';
import { days } from './medicine.constant';

const medicineSchema = new Schema<TMedicine>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imgUrl: { type: String, required: true },
    name: { type: String, required: true },
    power: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      enum: days,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Medicine = model<TMedicine>('Medicine', medicineSchema);
