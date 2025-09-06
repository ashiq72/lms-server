"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_1 = require("../models/student");
const AppError_1 = __importDefault(require("../error/AppError"));
const user_1 = require("../models/user");
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    let searchterm = "";
    const studentSearchAbleField = ["email", "name.firstName"];
    if (query.searchterm) {
        searchterm = query === null || query === void 0 ? void 0 : query.searchterm;
    }
    const serachQuery = student_1.Student.find({
        $or: studentSearchAbleField.map((field) => ({
            [field]: { $regex: searchterm, $options: "i" },
        })),
    });
    const result = yield serachQuery;
    // .populate("admissionSemester")
    // .populate({
    //   path: "academicDepartment",
    //   populate: {
    //     path: "academicFaculty",
    //   },
    // });
    return result;
});
const getSingleStudentFromDB = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_1.Student.findOne(studentId);
    // .populate("admissionSemester")
    // .populate({
    //   path: "academicDepartment",
    //   populate: {
    //     path: "academicFaculty",
    //   },
    // });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deletedUser = yield user_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error("Failed to delete student");
    }
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
};
