import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./auth.interface";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../../utils/sendEmail";
import { verifyToken } from "../user/user.utils";

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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  // Create token
  return {
    accessToken,
    refreshToken,
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

  await User.findOneAndUpdate(
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
  return null;
};
const refreshToken = async (token: string) => {
  // checking if the varify token
  // const decoded = jwt.verify(
  //   token,
  //   config.jwt_refresh_secret as string
  // ) as JwtPayload;
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { role, userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

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

  if (
    user.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);

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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  const resetUiLink = `${config.reset_pass_ui_link}?id=${userId}&token=${resetToken}`;
  sendEmail(user.email, resetUiLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.isUserExistsByCustomId(payload.id);

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

  // checking if the varify token
  // const decoded = jwt.verify(
  //   token,
  //   config.jwt_access_secret as string
  // ) as JwtPayload;

  const decoded = verifyToken(token, config.jwt_access_secret as string);

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  // Change password
  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
    }
  );
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
