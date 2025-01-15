import express, { Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/routes/student";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

//applications routes
app.use("/api/v1/students", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  res.send(a.toString());
});

export default app;
