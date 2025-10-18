import httpStatus from "http-status";
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let searchterm = "";
  const studentSearchAbleFields = ["email", "name.firstName"];
  if (query.searchterm) {
    searchterm = query?.searchterm as string;
  }

  const serachQuery = Student.find({
    $or: studentSearchAbleFields.map((field) => ({
      [field]: { $regex: searchterm, $options: "i" },
    })),
  });

  const excludeFields = ["searchTerm", "sort", "page", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log({ query }, { queryObj });
  const filterQuery = serachQuery.find(queryObj);
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });

  let sort = "-createdAt";

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  console.log(skip);

  const limitQuery = paginateQuery.limit(limit);

  // field limiting

  let fields = "-__v";

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
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
