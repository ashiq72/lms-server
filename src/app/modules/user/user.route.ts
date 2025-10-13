import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import auth from "../../middlewares/auth";
import { USER_ROLL } from "./user.constant";
const router = express.Router();

router.post(
  "/create-student",
  // auth(USER_ROLL.admin, USER_ROLL.student),
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);

export const UserRouter = router;
