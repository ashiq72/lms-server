import { TStudent } from "../interfaces/student";
import { Student } from "../models/student";

const getAllStudentsFormDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (studentId: String) => {
  const result = await Student.findOne(studentId);
  return result;
};

export const studentServices = {
  getAllStudentsFormDB,
  getSingleStudentFromDB,
};
