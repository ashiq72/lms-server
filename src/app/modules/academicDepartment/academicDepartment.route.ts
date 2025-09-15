import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "../academicDepartment/academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartmemt
);

router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDeartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
