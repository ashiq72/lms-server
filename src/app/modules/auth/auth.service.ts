import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (playload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(playload.id);

  // Checking if the user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // Checking if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is deleted!");
  }

  // Checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is block!");
  }

  // Access granted: Send AccessToken, Refresh token

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
      expiresIn: "10d",
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
