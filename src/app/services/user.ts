import config from "../../config";
import { TStudent } from "../interfaces/student";
import { NewUser } from "../interfaces/user";
import { Student } from "../models/student";
import { User } from "../models/user";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    // create a user object
    const userData: NewUser = {
      //
      // if password is not given, user deafault password

      password: password || (config.default_password as string),

      role: "student",

      // manually create a user id
      id: "errwkop453",
    };

    // Create a user
    const newUser = await User.create(userData);

    // create a student
    if (Object.keys(newUser).length) {
      (studentData.id = newUser.id), (studentData.user = newUser._id);

      const newStudent = await Student.create(studentData);
      return newStudent;
    }
    // const studentResult = await result.createStudent(student);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
