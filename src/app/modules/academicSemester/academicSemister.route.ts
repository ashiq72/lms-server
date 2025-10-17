import express from "express";
import { AcademicSemesterController } from "./academicSemister.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemister.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);
router.get("/", AcademicSemesterController.getAllAcademicSemester);

router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester
);

router.patch("/:semesterId", AcademicSemesterController.updateAcademicSemester);
router.delete(
  "/:semesterId",
  AcademicSemesterController.deleteAcademicSemester
);

export const AcademicSemesterRoutes = router;
