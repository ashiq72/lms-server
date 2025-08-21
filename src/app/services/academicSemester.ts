import { TAcademicSemester } from "../interfaces/academicSemester";
import { AcademicSemester } from "../models/academicSemester";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };

  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summar: "02",
    Fall: "03",
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDB,
};
