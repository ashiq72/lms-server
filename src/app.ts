import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandeller";
import router from "./allRoutes";
import cookieParser from "cookie-parser";
const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//applications routes
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  var a = 10;
  res.send(a.toString());
});

app.use(globalErrorHandler);

export default app;
