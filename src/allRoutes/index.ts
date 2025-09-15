import { Router } from "express";
import { UserRouter } from "../app/modules/user/user.route";
import { StudentRoutes } from "../app/modules/student/student.route";
import { AcademicSemesterRoutes } from "../app/modules/academicSemester/academicSemister.route";
import { AcademicFacultyRoutes } from "../app/modules/academicFaculty/academicFaculty.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";

const router = Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRoutes);
router.use("/students", StudentRoutes);
router.use("/academic-semester", AcademicSemesterRoutes);
router.use("/academic-faculty", AcademicFacultyRoutes);

export default router;
