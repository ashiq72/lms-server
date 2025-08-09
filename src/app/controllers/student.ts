import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "../services/student";

const getAllStudents: RequestHandler = async (req, res, next) => {
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

const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      sucess: true,
      message: "Single Student fatched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
};
