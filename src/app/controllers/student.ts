import { NextFunction, Request, Response } from "express";
import { studentServices } from "../services/student";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getAllStudentsFormDB();

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      sucess: true,
      message: "Single Student fatched successfully",
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: "Error from get single data",
    //   error: error,
    // });
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
};
