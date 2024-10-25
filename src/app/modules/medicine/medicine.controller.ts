import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { MedicineServices } from './medicine.service';

const addMedicine = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const data = req.body;
  const medicineReminder = {
    userId,
    ...data,
  };
  console.log(medicineReminder);
  const result = await MedicineServices.addMedicineIntoDB(medicineReminder);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine added successfully!',
    data: result,
  });
});

const getUserMedicines = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await MedicineServices.getUserMedicinesFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's medicines fetched successfully!",
    data: result,
  });
});

const removeUserMedicines = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MedicineServices.RemoveUserMedicineFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine removed successfully!',
    data: result,
  });
});

export const MedicineControllers = {
  addMedicine,
  getUserMedicines,
  removeUserMedicines,
};
