import { UserServices } from "./user.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../error/AppError";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Create Successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, "Token not found!");
  }

  const result = await UserServices.getMe(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Create Successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  getMe,
};
