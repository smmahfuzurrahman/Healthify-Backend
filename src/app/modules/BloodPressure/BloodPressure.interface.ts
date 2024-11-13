import { Types } from "mongoose";

export type TBloodPressure = {
    userId: Types.ObjectId;
  systolic: number;
  diastolic: number;
  status: string;
  date: string;
};
