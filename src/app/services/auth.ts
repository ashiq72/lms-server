import httpStatus from "http-status";
import AppError from "../error/AppError";
import { TLoginUser } from "../interfaces/auth";
import { User } from "../models/user";

const loginUser = async (playload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(playload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // const isDeleted = isUserExists?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.NOT_FOUND, "This user is deleted!");
  // }

  // const userStatus = isUserExists?.status;
  // console.log(userStatus);

  // if (userStatus === "blocked") {
  //   throw new AppError(httpStatus.NOT_FOUND, "This user is block!");
  // }

  console.log(playload?.password, user?.password);

  if (!(await User.isPasswordMatched(playload?.password, user?.password)))
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This user is not password not match!"
    );

  return {};
};

export const AuthServices = {
  loginUser,
};
