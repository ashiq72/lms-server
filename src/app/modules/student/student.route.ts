import express from "express";
import { StudentControllers } from "./student.controller";
import auth from "../../middlewares/auth";
import { USER_ROLL } from "../user/user.constant";

const router = express.Router();

// will call controller function
router.get("/", auth(USER_ROLL.student), StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getSingleStudent);

export const StudentRoutes = router;
