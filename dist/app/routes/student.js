"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
// will call controller function
router.get("/", student_1.StudentControllers.getAllStudents);
router.get("/:id", student_1.StudentControllers.getSingleStudent);
exports.StudentRoutes = router;
