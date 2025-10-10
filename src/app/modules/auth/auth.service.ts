import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";

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
  const accessToken = createToken(jwtPayload, config.jwt_access_secret, "1d");

  const refreshToken = jwt.sign(
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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);

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

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match!");

  // hash new password

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
