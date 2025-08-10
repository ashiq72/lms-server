import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentServices } from "../services/student";
import httpStatus from "http-status";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFormDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved succesfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved sucessfully",
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
};
