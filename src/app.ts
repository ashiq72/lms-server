import express, { Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/routes/student";
import { UserRouter } from "./app/routes/user";
import globalErrorHandler from "./app/middlewares/globalErrorHandeller";
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

app.use(globalErrorHandler);

export default app;
