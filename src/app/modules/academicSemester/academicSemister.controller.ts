import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicSemisterServices } from "./academicSemister.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemesterIntoDb(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is Create Successfully",
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is create successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemisterServices.getSingleAcademicSemesterFromDB(
    semesterId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester are retrieved successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemisterServices.updateAcademicSemesterFromDB(
    semesterId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester successfully updated",
    data: result,
  });
});
const deleteAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemisterServices.deleteAcademicSemesterFromDB(
    semesterId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester successfully deleted",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
