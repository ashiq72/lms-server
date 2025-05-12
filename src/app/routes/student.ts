import express from "express";
import { studentControllers } from "../controllers/student";

const router = express.Router();

// will call controller function
router.get("/students", studentControllers.getAllStudents);
router.get("/student/:id", studentControllers.getSingleStudent);

export const StudentRoutes = router;
export const CourseRoutes = router;
