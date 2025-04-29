import config from "../../config";
import { TStudent } from "../interfaces/student";
import { NewUser } from "../interfaces/user";
import { User } from "../models/user";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    const user: NewUser = {};

    // 
    // if password is not given, user deafault password

    user.password = password || (config.default_password as string);

    user.role = "student";

cosnt result = await User.create(user);


  } catch (error: any) {
    console.log(error);
  }
};

export const userServices = {
  createStudentIntoDB,
};
