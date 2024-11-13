import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReportServices } from './report.service';

const addReport = catchAsync(async (req, res) => {
  const report = req.body;
  const result = await ReportServices.addReportIntoDB(report);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report added successfully',
    data: result,
  });
});

const getReports = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await ReportServices.getReportsFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports retrieved successfully',
    data: result,
  });
});

const getSingleReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReportServices.getSingleReportFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report retrieved successfully',
    data: result,
  });
});

const deleteReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReportServices.deleteReportFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report deleted successfully',
    data: result,
  });
});

export const ReportControllers = {
  addReport,
  getReports,
  getSingleReport,
  deleteReport,
};
