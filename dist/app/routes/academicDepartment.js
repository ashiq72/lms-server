"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const academicDepartment_1 = require("../zod/academicDepartment");
const academicDepartment_2 = require("../controllers/academicDepartment");
const router = express_1.default.Router();
router.post("/create-academic-department", (0, validateRequest_1.default)(academicDepartment_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_2.AcademicDepartmentControllers.createAcademicDepartmemt);
router.get("/:departmentId", academicDepartment_2.AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch("/:departmentId", (0, validateRequest_1.default)(academicDepartment_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_2.AcademicDepartmentControllers.updateAcademicDeartment);
router.get("/", academicDepartment_2.AcademicDepartmentControllers.getAllAcademicDepartments);
exports.AcademicDepartmentRoutes = router;
