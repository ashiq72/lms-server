"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const student_validation_1 = require("../zod/student.validation");
const router = express_1.default.Router();
router.post("/create-student", (0, validateRequest_1.default)(student_validation_1.createStudentValidationSchema), user_1.UserController.createStudent);
exports.UserRouter = router;
