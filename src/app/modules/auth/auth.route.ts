import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "../auth/auth.validation";
import { AuthControllers } from "../auth/auth.controller";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/change-password",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
