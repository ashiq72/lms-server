"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_1 = require("../controllers/academicSemester");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const academicSemester_validation_1 = require("../zod/academicSemester.validation");
const router = express_1.default.Router();
router.post("/create-academic-semester", (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidations.createAcademicSemesterValidationSchema), academicSemester_1.AcademicSemesterController.createAcademicSemester);
router.get("/", academicSemester_1.AcademicSemesterController.getAllAcademicSemester);
router.get("/:semesterId", academicSemester_1.AcademicSemesterController.getSingleAcademicSemester);
exports.AcademicSemesterRoutes = router;
