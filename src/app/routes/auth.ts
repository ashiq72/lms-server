import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { AuthValidation } from "../zod/auth";
import { AuthControllers } from "../controllers/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
