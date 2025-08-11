import { UserServices } from "../services/user";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicSemester = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body;
  //   const result = await UserServices.createStudentIntoDB(password, studentData);
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: "Student Create Successfully",
  //     data: result,
  //   });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
