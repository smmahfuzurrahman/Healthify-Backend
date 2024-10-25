/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from 'mongoose';
import { IUserModel, TUser } from './user.interface';
import { bloodGroup, gender, role } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: gender,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    role: {
      type: String,
      enum: role,
      default: 'user',
    },
    isDiabetes: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
    },
    profileCompleteStatus: {
      type: Number,
      default: 25,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// bcrypt password before save into database
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.sault_rounds),
  );
  next();
});

// removing the password field after saving the data
userSchema.post('save', function (doc: any, next) {
  // Convert the document to an object and remove the fields
  delete doc._doc.password;
  next();
});

// compare the plain password and hashed password before user login
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, IUserModel>('User', userSchema);
