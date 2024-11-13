import { Types } from 'mongoose';

export type TDays =
  | 'saturday'
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

export type TMedicine = {
  userId: Types.ObjectId;
  imgUrl: string;
  name: string;
  power: string;
  time: string;
  days: TDays[];
  email: string;
};
