import httpStatus from "http-status";
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  console.log(query);

  let searchterm = "";
  const studentSearchAbleField = ["email", "name.firstName"];
  if (query.searchterm) {
    searchterm = query?.searchterm as string;
  }

  const serachQuery = Student.find({
    $or: studentSearchAbleField.map((field) => ({
      [field]: { $regex: searchterm, $options: "i" },
    })),
  });

  const result = await serachQuery;
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });
  return result;
};

const getSingleStudentFromDB = async (studentId: String) => {
  const result = await Student.findOne(studentId);
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
