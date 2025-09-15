import { TAcademicSemester } from "./academicSemister.interface";
import { AcademicSemester } from "./academicSemister.model";

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

// const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
//   const result = await AcademicSemester.findById(semesterId);
//   return result;
// };

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
