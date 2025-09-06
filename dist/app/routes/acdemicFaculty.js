"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const academicFaculty_1 = require("../controllers/academicFaculty");
const academicFaculty_2 = require("../zod/academicFaculty");
const router = express_1.default.Router();
router.post("/create-academic-faculty", (0, validateRequest_1.default)(academicFaculty_2.AcademicFacultyValidation.createAcademicFacultyValidationSchema), academicFaculty_1.AcademicFacultyControllers.createAcademicFaculty);
router.get("/:facultyId", academicFaculty_1.AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch("/:facultyId", (0, validateRequest_1.default)(academicFaculty_2.AcademicFacultyValidation.updateAcademicFacultyValidationSchema), academicFaculty_1.AcademicFacultyControllers.updateAcademicFaculty);
router.get("/", academicFaculty_1.AcademicFacultyControllers.getAllAcademicFaculties);
exports.AcademicFacultyRoutes = router;
