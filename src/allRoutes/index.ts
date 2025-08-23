import { Router } from "express";
import { UserRouter } from "../app/routes/user";
import { StudentRoutes } from "../app/routes/student";
import { AcademicSemesterRoutes } from "../app/routes/academicSemester";
import { AcademicFacultyRoutes } from "../app/routes/acdemicFaculty";

const router = Router();

router.use("/users", UserRouter);
router.use("/students", StudentRoutes);
router.use("/academic-semester", AcademicSemesterRoutes);
router.use("/academic-faculty", AcademicFacultyRoutes);

export default router;
