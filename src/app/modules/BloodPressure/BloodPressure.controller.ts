import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BloodPressureServices } from './BloodPressure.service';

const addBloodPressure = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await BloodPressureServices.addBloodPressureIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report added successfully',
    data: result,
  });
});

const getBloodPressure = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await BloodPressureServices.getBloodPressuresFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports retrieved successfully',
    data: result,
  });
});

const deleteBloodPressure = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id from line 30 control');
  const result = await BloodPressureServices.deleteBloodPressureFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report deleted successfully',
    data: result,
  });
});

export const BloodPressureControllers = {
  addBloodPressure,
  getBloodPressure,
  deleteBloodPressure,
};
