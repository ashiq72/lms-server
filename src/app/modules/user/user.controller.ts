import { UserServices } from "./user.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../error/AppError";

const createStudent = catchAsync(async (req, res) => {
  // const { password, student: studentData } = req.body;
  console.log(req.file);
  console.log(JSON.parse(req.body.data));

  // const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Create Successfully",
    data: null,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved Successfully",
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved Successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  getMe,
  changeStatus,
};
