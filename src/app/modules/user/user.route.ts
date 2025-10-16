import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/student.validation";
import auth from "../../middlewares/auth";
import { USER_ROLL } from "./user.constant";
import { UserValidation } from "./user.validation";
import { upload } from "../../../utils/sendImageToCloudinary";
const router = express.Router();

router.post(
  "/create-student",
  // auth(USER_ROLL.admin, USER_ROLL.student),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);
router.get(
  "/me",
  auth(USER_ROLL.admin, USER_ROLL.student),
  UserController.getMe
);

router.post(
  "/change-status/:id",
  // auth(USER_ROLL.admin, USER_ROLL.student),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus
);

export const UserRouter = router;
