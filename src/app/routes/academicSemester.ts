import express from "express";
import { AcademicSemesterController } from "../controllers/academicSemester";

const router = express.Router();

router.post(
  "create-academic-semester",
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
