import express from "express";
import { StudentControllers } from "./student.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// will call controller function
router.get("/", auth(), StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getSingleStudent);

export const StudentRoutes = router;
