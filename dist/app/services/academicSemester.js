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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemisterServices = void 0;
const academicSemester_1 = require("../models/academicSemester");
const createAcademicSemesterIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterNameCodeMapper = {
        Autumn: "01",
        Summar: "02",
        Fall: "03",
    };
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid Semester Code");
    }
    const result = yield academicSemester_1.AcademicSemester.create(payload);
    return result;
});
const getAllAcademicSemesterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_1.AcademicSemester.find();
    return result;
});
// const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
//   const result = await AcademicSemester.findById(semesterId);
//   return result;
// };
const getSingleAcademicSemesterFromDB = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_1.AcademicSemester.findOne({ _id: semesterId });
    return result;
});
exports.AcademicSemisterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
};
