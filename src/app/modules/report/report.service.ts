import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TReport } from './report.interface';
import AppError from '../../errors/AppError';
import { Report } from './report.model';

const addReportIntoDB = async (payload: TReport) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Report.create(payload);
  return result;
};

const getReportsFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Report.find({
    userId,
  });
  return result;
};

const getSingleReportFromDB = async (id: string) => {
  const isReportExist = await User.findById(id);
  if (!isReportExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
  }
  const result = await Report.findById(id);
  return result;
};

const deleteReportFromDB = async (id: string) => {
  const isReportExist = await Report.findById(id);
  if (!isReportExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
  }
  const result = await Report.findByIdAndDelete(id);
  return result;
};

export const ReportServices = {
  addReportIntoDB,
  getReportsFromDB,
  getSingleReportFromDB,
  deleteReportFromDB
};
