import express from "express";
import { StudentControllers } from "../controllers/student";

const router = express.Router();

// will call controller function
router.get("/", StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getSingleStudent);

export const StudentRoutes = router;
export const CourseRoutes = router;
