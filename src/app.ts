import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/routes/student";
import { UserRouter } from "./app/routes/user";
const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//applications routes
app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", UserRouter);

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  res.send(a.toString());
});

// app.use((err: any, req: Request, res: Response, next: any) => {
//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal server error",
//     error: err,
//   });
// });

// At the bottom of your middleware stack
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error Handler:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    error: err, // optional: return stack trace or validation errors
  });
});

export default app;
