import { Model } from 'mongoose';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TRole = 'user' | 'admin';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone?: number;
  age?: number;
  bloodGroup?: TBloodGroup;
  address?: string;
  gender?: 'male' | 'female';
  isDiabetes?: boolean;
  isPregnant?: boolean;
  profileCompleteStatus?: number;
  role?: TRole;
  isDeleted?: boolean;
};

export interface IUserModel extends Model<TUser> {
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
