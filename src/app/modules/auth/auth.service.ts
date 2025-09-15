import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
import config from "../../../config";

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

  if (!(await User.isPasswordMatched(playload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match!");

  const jwtPlayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(
    jwtPlayload,
    config.jwt_access_secret as string,
    {
      expiresIn: 60 * 60,
    }
  );

  // Create token
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
