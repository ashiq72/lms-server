import express from "express";
import { UserController } from "../controllers/user";
import validateRequest from "../middlewares/validateRequest";
import { createStudentValidationSchema } from "../zod/student.validation";
import auth from "../middlewares/auth";
const router = express.Router();

router.post(
  "/create-student",
  auth(),
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);

export const UserRouter = router;
