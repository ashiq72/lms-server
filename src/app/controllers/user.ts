import { Request, Response } from "express";
import { UserServices } from "../services/user";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

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

export const UserController = {
  createStudent,
};
