import { Request, Response } from "express";
import { studentServices } from "../services/student";
import studentValidationSchema from "../joi/student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // will call service function to send this data

    const student = req.body;

    const { error, value } = studentValidationSchema.validate(student);

    const result = await studentServices.createStudentIntoDB(student);

    if (error) {
      res.status(500).json({
        success: false,
        message: "Somthin went wrong",
        error: error,
      });
    }

    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error,
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
