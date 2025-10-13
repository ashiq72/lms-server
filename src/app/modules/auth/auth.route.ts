import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "../auth/auth.validation";
import { AuthControllers } from "../auth/auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLL } from "../user/user.constant";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/change-password",
  auth(USER_ROLL.admin, USER_ROLL.faculty, USER_ROLL.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);
router.post(
  "/forget-password",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
