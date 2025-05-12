import express, { Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/routes/student";
import { UserRouter } from "./app/routes/user";
import { any } from "joi";
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

app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    error: err,
  });
});

export default app;
