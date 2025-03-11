import { TStudent } from "../interfaces/student";
import { Student } from "../models/student";

const createStudentIntoDB = async (studentData: TStudent) => {
  // built in static method

  //build in instance method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await Student.create(studentData);

  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists");
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFormDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (studentId: String) => {
  const result = await Student.findOne(studentId);
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFormDB,
  getSingleStudentFromDB,
};
