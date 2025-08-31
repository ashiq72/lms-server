import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../../interface/error";
import config from "../../config";
import { handleZodError } from "../error/handleZodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV == "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
