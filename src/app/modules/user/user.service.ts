import mongoose from "mongoose";
import httpStatus from "http-status";
import config from "../../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { AcademicSemester } from "../academicSemester/academicSemister.model";
import { Student } from "../student/student.model";
import { User } from "./user.model";
import { generateStudentId, verifyToken } from "./user.utils";
import AppError from "../../error/AppError";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";
  // set student email
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findOne(
    payload.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    if (!admissionSemester) {
      throw new Error("Semester not found");
    }
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    sendImageToCloudinary();
    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create student");
  }
};

const getMe = async (userId: string, role: string) => {
  console.log(userId, role);

  let result = null;
  if (role === "student") {
    result = await Student.findOne({ id: userId }).populate("user");
  }
  return result;
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  getMe,
  changeStatus,
};
