import { Router } from "express";
import { UserRouter } from "../app/modules/user/user.route";
import { StudentRoutes } from "../app/modules/student/student.route";
import { AcademicSemesterRoutes } from "../app/modules/academicSemester/academicSemister.route";
import { AcademicFacultyRoutes } from "../app/modules/academicFaculty/academicFaculty.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { AdminRoutes } from "../app/modules/Admin/admin.route";
import { AcademicDepartmentRoutes } from "../app/modules/academicDepartment/academicDepartment.route";

const router = Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRoutes);
router.use("/admins", AdminRoutes);
router.use("/students", StudentRoutes);
router.use("/academic-semester", AcademicSemesterRoutes);
router.use("/academic-faculty", AcademicFacultyRoutes);
router.use("/academic-department", AcademicDepartmentRoutes);

export default router;
