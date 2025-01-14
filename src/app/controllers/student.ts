import { Request, Response } from "express";
import { studentServices } from "../services/student";
import Joi from "joi";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    // will call service function to send this data

    const result = await studentServices.createStudentIntoDB(student);

    res.status(200).send({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// creating a schema validation joi

const JoivalidationSchema = Joi.object({
  id: Joi.string(),
  name: {
    firstName: Joi.string().max(20).required(),
  },
});

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
