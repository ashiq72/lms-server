import config from "../../config";
import { TStudent } from "../interfaces/student";
import { TUser } from "../interfaces/user";
import { AcademicSemester } from "../models/academicSemester";
import { Student } from "../models/student";
import { User } from "../models/user";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  try {
    // create a user object
    const userData: Partial<TUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = "student";
    // manually create a user id

    const addmissionSemester = await AcademicSemester.findById(
      payload.addmissionSemester
    );

    if (!addmissionSemester) {
      throw new Error("Admission semester not found");
    }

    userData.id = await generateStudentId(addmissionSemester);

    // Create a user
    const newUser = await User.create(userData);

    // create a student
    if (Object.keys(newUser).length) {
      (payload.id = newUser.id), (payload.user = newUser._id);

      const newStudent = await Student.create(payload);
      return newStudent;
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
