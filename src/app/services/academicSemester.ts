import { TAcademicSemester } from "../interfaces/academicSemester";
import { AcademicSemester } from "../models/academicSemester";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemesterIntoDb,
};
