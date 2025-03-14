import { z } from "zod";
import { Request, Response } from "express";
import { studentServices } from "../services/student";
import studentValidationSchema from "../zod/student.validation";
// import studentValidationSchema from "../joi/student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Creating a schema validation using Zod
    const zodparsedData = studentValidationSchema.parse(studentData);
    console.log(zodparsedData);

    const result = await studentServices.createStudentIntoDB(zodparsedData);

    // Creating a schema validation using joi

    // const { error, value } = studentValidationSchema.validate(student);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Somthing went wrong",
    //     error: error,
    //   });
    // }
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create student",
      error: "Failed",
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFormDB();

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      sucess: true,
      message: "Single Student fatched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error from get single data",
      error: error,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
